<template>

  <form @submit.prevent="submitAuthEmailForm">

    <div class="mb-2">
      <FormInput 
        v-model="email"
        type="email"
        id="email"
        name="メールアドレス"
      />
      <error-message>
        {{ error.email }}
      </error-message>
    </div> 

    <div class="mb-2">
      <FormInput 
        v-model="password"
        type="password"
        id="password"
        name="パスワード"
      />
      <error-message>
        {{error.password}}
      </error-message>
    </div>

    <div v-if="mode === 'register'" class="mb-2">
      <FormInput 
        v-model="passwordConfirm"
        type="password"
        id="passwordConfirm"
        name="パスワード確認"
      />
      <error-message>
        {{ error.passwordConfirm }}
      </error-message>
    </div>

    <div>
      <base-button 
        class="my-1 w-full"
        mode="filled-lg" 
        :isDisabled="deactivated"
      >
        <span class="w-full">{{ buttonText }}</span>
      </base-button>
      <error-message>
        {{ error.register || error.login }}
      </error-message>
    </div>

  </form>

</template>

<script>
import FirebaseAuth from "@/services/firebase-auth.service"

import FormInput from "@/components/ui/FormInput"
import ErrorMessage from "@/components/ui/ErrorMessage"
import BaseButton from "@/components/ui/BaseButton"

export default {
  components: {
    FormInput,
    ErrorMessage,
    BaseButton,
  },
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      buttonText: '',
      deactivated: false,
      error: {
        register: '',
        login: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
    }
  },
  methods: {
    async submitAuthEmailForm() {
      if(this.mode === "register") {
        await this.registerWithEmailAndPassword()
      } else if (this.mode === "login") {
        await this.loginWithEmailAndPassword()
      }
    },
    async registerWithEmailAndPassword() {
      // input validation
      if(!this.validateForRegistration()) {
        return
      }

      // create User with email and password
      try {
        // Register new user
        this.deactivated = true

        // instantiate FirebaseAuth
        await new FirebaseAuth(this.password, this.email).createUserWithEmailAndPassword()

        // open confirmation modal
        this.$emit('authConfirm')
        
        this.deactivated = false

      } catch(err) {
        this.error.register = "そのメールアドレスはすでに登録済みです。"
        this.deactivated = false
      }
    },
    async loginWithEmailAndPassword() {
      // input validation
      if(!this.validateForLogin()) {
        return
      }

      console.log(this.validateForLogin())

      try {
        this.deactivated = true 

        // instantiate FirebaseAuth
        await new FirebaseAuth(this.password, this.email).loginUserWithEmailAndPassword()

        this.$store.commit('modal/closeModal')
        this.deactivated = false

      } catch(err) {
        this.error.login = "メールアドレスまたはパスワードが正しくありません。"
        this.deactivated = false
      }
    },
    validateForRegistration() {
      this.error.email = ''
      this.error.password = ''
      this.error.passwordConfirm = ''

      if(!this.email) {
        this.error.email = 'メールアドレスを入力してください。'
      }

      if(!this.password) {
        this.error.email = 'パスワードを入力してください。'
      }

      if(this.password.length < 8) {
        this.error.password = '８文字以上のパスワードを入力してください。'
      }

      if(this.password !== this.passwordConfirm || !this.passwordConfirm) {
        this.error.passwordConfirm = 'パスワードが間違っています。'
      }

      return !this.error.email && !this.error.password && !this.error.passwordConfirm ? true : false
    },
    validateForLogin() {
      this.error.email = ''
      this.error.password = ''

      if(!this.email) {
        this.error.email = 'メールアドレスを入力してください。'
      }

      if(!this.password) {
        this.error.password = 'パスワードを入力してください。'
      }

      return !this.error.email && !this.error.password ? true : false
    },
  },
  emits: ['authConfirm'],
  mounted() {
    if (this.mode === 'register') {
      this.buttonText = '登録する'
    } else if (this.mode === 'login') {
      this.buttonText = 'ログイン'
    }
  },
}
</script>