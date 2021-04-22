<template>
  <div>
    <h3 class="text-center text-lg pb-5">{{ titleText }}</h3>
    <div v-if="!showForm"> 
      <button 
        class="focus:outline-none w-full text-gray-500 flex items-center justify-center rounded py-2 border border-gray-200 shadow"
        @click="initGoogleAuthProvider"
      >
        <svg class="mr-2" width="18" height="18" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>

        {{ googleText }}
      </button>

      <button
        class="mt-5 focus:outline-none bg-indigo-600 w-full text-white py-2 rounded shadow border border-indigo-600"
        @click="openForm"
      >
        {{ emailText }}
      </button>
      
    </div>
    

    <div v-if="showForm">
      <button @click="closeForm">戻る</button>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">メールアドレス</label>
          <input type="email" id="email" v-model="email">
        </div>
        <div class="form-control">
          <label for="password">パスワード</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button>{{ btnText }}</button>
      </form>
    </div>
  </div>


</template>

<script>
import environments from "@/environments/environments"
import firebase from "firebase/app"
import "firebase/auth"

export default {
  props: {
    mode: {
      type: String,
      required: true,
      default: 'login'
    }
  },
  data() {
    return {
      email: '',
      password: '',
      titleText: '',
      btnText: '',
      googleText: '',
      emailText: '',
      showForm: false
    }
  },
  mounted() {
    this.showForm = false
    this.setBtnText(this.mode)
  },
  methods: {
    async submitForm() {
      if(this.mode === "register") {
        await this.registerUserWithEmailAndPassword()
      } else if (this.mode === "login") {
        const user = await this.signInWithEmailAndPassword()
        console.log(user)
      }
    },
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
    async registerUserWithEmailAndPassword() {

      console.log(environments.front.url)

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

        return res

      } catch(err) {
        console.error()
      }

    },
    async signInWithEmailAndPassword() {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)

        return userCredential.user
      } catch(err) {
        console.error()
      }
    },
    setBtnText(mode) {
      switch(mode) {
        case 'login':
          this.titleText = "ログイン"
          this.btnText = "ログイン"
          this.googleText = "Google"
          this.emailText = "メールアドレス"
          break
        case 'register':
          this.titleText = "ユーザー登録"
          this.btnText = "登録する"
          this.googleText = "Googleで登録"
          this.emailText = "メールアドレスで登録"
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
    }
  }
}
</script>
