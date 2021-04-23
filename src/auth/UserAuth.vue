<template>

  <h3 class="text-center text-lg pb-2">{{ textContent.title }}</h3>

  <div v-if="!showForm && !showPasswordResetForm"> 
    <button 
      class="focus:outline-none w-full text-gray-500 flex items-center justify-center rounded py-2 border border-gray-200 shadow"
      @click="initGoogleAuthProvider"
    >
      <svg class="mr-2" width="18" height="18" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>

      {{ textContent.googleAuth }}
    </button>

    <button
      class="mt-5 focus:outline-none bg-indigo-600 w-full text-white py-2 rounded shadow border border-indigo-600"
      @click="openForm"
    >
      {{ textContent.emailAuth }}
    </button>
    
  </div>


  <div v-if="showForm">
    <button 
      class="focus:outline-none mb-2 flex items-center"
      @click="closeForm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
      <span class="text-sm ml-1">戻る</span>
    </button>

    <form @submit.prevent="submitForm">

      <div class="mb-2">
        <FormInput 
          v-model="email"
          type="email"
          id="email"
          name="メールアドレス"
        />
        <error-message v-if="error.emailRegister">{{ error.emailRegister }}</error-message>
      </div> 

      <div class="mb-2">
        <FormInput 
          v-model="password"
          type="password"
          id="password"
          name="パスワード"
        />
        <error-message v-if="error.passwordRegister">{{error.passwordRegister}}</error-message>
      </div>

      <div v-if="mode === 'register'" class="mb-2">
        <FormInput 
          v-model="passwordConfirm"
          type="password"
          id="passwordConfirm"
          name="パスワード確認"
        />
        <error-message v-if="error.passwordConfirm">{{ error.passwordConfirm }}</error-message>
      </div>

      <button 
        class="my-1 w-full text-center bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-800 duration-200 text-white text-base focus:outline-none border border-indigo-600 hover:border-indigo-800 disabled:opacity-50 disabled:pointer-events-none"
        :disabled="deactivated"
      >{{ textContent.btn }}</button>
      <error-message v-if="error.register || error.login">{{ error.register || error.login }}</error-message>

    </form>

    <!-- redirect to password reset form -->
    <button 
      v-if="mode === 'login'"
      class="block focus:outline-none text-xs mt-2"
      @click="openPasswordResetForm"
    >
      パスワードを忘れた方はこちらへ
    </button>
  </div>
  


  <div v-if="showPasswordResetForm">
    <button 
      class="focus:outline-none mb-2 flex items-center"
      @click="closePasswordResetForm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
      <span class="text-sm ml-1">戻る</span>
    </button>

    <p class="text-sm">ユーザー登録されているいーメールアドレスを入力してください。パスワードリセットのリンクをそのメールアドレス宛に送信します。</p>

    <form @submit.prevent="sendResetPassword">
      <div class="my-2">
        <FormInput 
          v-model="passwordReset.email"
          type="email"
          id="email"
          name="メールアドレス"
        />
      </div> 

      <navbar-button 
        mode="filled"
        :isDisabled="passwordReset.deactivated"
      >送信</navbar-button>

      <error-message v-if="passwordReset.error">{{ passwordReset.error }}</error-message>

      <small
        v-if="passwordReset.sent"
        class="block text-sm"
      >
        {{ passwordReset.sent }}
      </small>
    </form>
  </div>


</template>

<script>
import environments from "@/environments/environments"
import firebase from "firebase/app"
import "firebase/auth"
import NavbarButton from "@/components/ui/NavbarButton"
import FormInput from "@/components/ui/formcontrol/FormInput"
import ErrorMessage from "@/components/ui/formcontrol/ErrorMessage"

export default {
  components: {
    NavbarButton,
    FormInput,
    ErrorMessage
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'login',
    }
  },
  data() {
    return {
      showForm: false,
      showPasswordResetForm: false,
      email: '',
      password: '',
      passwordConfirm: '',
      deactivated: false,
      error: {
        emailRegister: '',
        passwordRegister: '',
        passwordConfirm: '',
        register: '',
        login: '',
      },
      textContent: {
        title: '',
        btn: '',
        googleAuth: '',
        emailAuth: '',
      },
      passwordReset: {
        email: '',
        error: '',
        sent: '',
        deactivated: false,
      },
    }
  },
  mounted() {
    this.showForm = false
    this.showPasswordResetForm = false
    this.setBtnText(this.mode)
  },
  methods: {
    validateLogin() {
      return
    },
    async sendResetPassword() {

      if(!this.passwordReset.email) {
        this.passwordReset.error = 'メールアドレスを入力してください。'
        return
      }

      try {
        this.passwordReset.deactivated = true

        const auth = firebase.auth()
        // set redirect url
        const actionCodeSettings = {
          url: environments.front.url
        }

        const res = await auth.sendPasswordResetEmail(this.emailForReset, actionCodeSettings)

        this.passwordReset.sent = `パスワードリセットのリンクを送信しました。`

        return res

      } catch(err) {
        console.log(err)
      }
    },
    async submitForm() {
      if(this.mode === "register") {
        await this.registerUserWithEmailAndPassword()
      } else if (this.mode === "login") {
        await this.signInWithEmailAndPassword()
      }
    },
    // This method is for initiating Google Authentication
    async initGoogleAuthProvider() {
      // initiate google account auth
      const provider = new firebase.auth.GoogleAuthProvider()
      // set language to Japanese
      firebase.auth().languageCode = 'ja'

      const result = await firebase.auth().signInWithPopup(provider)

      const credential = result.credential
      const token = result.accessToken
      const user = result.user

      console.log(credential, token, user)

    },
    // This is for registering user with email and password
    async registerUserWithEmailAndPassword() {
      const validate = this.validateForRegistration()

      if(!validate) {
        return
      }

      // create User with email and password
      try {
        // Register new user
        const userCredential =  await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)

        // set redirect url
        const actionCodeSettings = {
          url: environments.front.url
        }

        // send confirmation email
        const res = await userCredential.user.sendEmailVerification(actionCodeSettings)

        this.$store.commit('modal/closeModal')

        return res

      } catch(err) {
        this.error.register = "そのメールアドレスはすでに登録済みです。"
      }
    },
    validateForRegistration() {
      this.error.emailRegister = ''
      this.error.passwordRegister = ''
      this.error.passwordConfirm = ''

      if(!this.email) {
        this.error.emailRegister = 'メールアドレスを入力してください。'
      }

      if(this.password.length < 8) {
        this.error.passwordRegister = '８文字以上のパスワードを入力してください。'
      }

      if(this.password !== this.passwordConfirm || !this.passwordConfirm) {
        this.error.passwordConfirm = 'パスワードが間違っています。'
      }

      if(!this.error.emailRegister && !this.error.passwordRegister && !this.error.passwordConfirm) {
        return true
      } else {
        return false
      }
    },
    // This is for signing user in with their email and password
    async signInWithEmailAndPassword() {
      try {
        this.deactivated = true 
        
        const userCredential = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)

        this.$store.commit('modal/closeModal')
        this.deactivated = false

        return userCredential.user
      } catch(err) {
        this.error.login = "メールアドレスまたはパスワードが正しくありません。"
      }
    },
    setBtnText(mode) {
      switch(mode) {
        case 'login':
          this.textContent = {
            title: "ログイン",
            btn: "ログイン",
            googleAuth: "Google",
            emailAuth: "メールアドレス",
          }
          break
        case 'register':
          this.textContent = {
            title: "ユーザー登録",
            btn: "登録する",
            googleAuth: "Googleで登録",
            emailAuth: "メールアドレスで登録",
          }
          break
        default:
          return
      }
    },
    openForm() {
      this.showForm = true
    },
    closeForm() {
      this.showForm = false
    },
    openPasswordResetForm() {
      this.textContent.title = "パスワードリセット"
      this.showForm = false
      this.showPasswordResetForm = true
    },
    closePasswordResetForm() {
      this.textContent.title = "ログイン"
      this.showPasswordResetForm = false
      this.showForm = true
    },
  }
}
</script>
