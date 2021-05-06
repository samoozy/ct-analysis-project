<template>

  <p class="mb-3 text-sm" v-if="!showResendVerification">
    いずれかの方法で再認証を行ってください
  </p>
  
  <div v-if="!showResendVerification && provider.google">
    <google-auth-button @emitClick="reauthenticateGoogleAuth">Google</google-auth-button>
  </div>
  
  <div v-if="!showResendVerification && provider.password">

    <form @submit.prevent="reauthenticateEmailAndPassword">
      <div class="my-2">
        <FormInput 
          v-model="password"
          type="password"
          id="password"
          name="パスワード"
        />
      </div>

      <base-button
        class="w-full"
        mode="filled-lg"
        :isDisabled="deactivated"
      ><span class="w-full">パスワード再確認</span></base-button>

      <error-message v-if="error">{{ error }}</error-message>
    </form>
  </div>

  <!-- Show this instead if the user's email has not been verified yet -->
  <div v-if="showResendVerification">
    <p class="py-3">メールアドレスが認証されていません。</p>

    <base-button 
      @emitClick="resendEmailVerification"
      mode="filled-lg"
      class="w-full"
      :isDisabled="deactivated"
    ><span class="w-full">確認メールを再送信する</span></base-button>
    <small class="text-sm" v-if="message">{{ message }}</small>

  </div>

</template>

<script>
import FirebaseAuth from "@/services/firebase-auth.service.js"
import GoogleAuthButton from "@/components/ui/GoogleAuthButton"
import BaseButton from "@/components/ui/BaseButton"
import FormInput from "@/components/ui/FormInput"
import ErrorMessage from "@/components/ui/ErrorMessage"


export default {
  components: {
    BaseButton,
    FormInput,
    ErrorMessage,
    GoogleAuthButton,
  },
  computed: {
    userVerified() {
      return this.$store.getters['auth/userVerified']
    },
    userEmail() {
      return this.$store.getters['auth/userEmail']
    },
    provider() {
      return this.$store.getters['auth/provider']
    }
  },
  data() {
    return {
      modalHook: '',
      password: '',
      error: '',
      message: '',
      deactivated: false,
      showResendVerification: false,
    }
  },
  methods: {
    setReauthenticatedModalHook() {
      this.$store.commit('modal/setModalHook', `${this.modalHook}-reauthenticated`)
    },
    async reauthenticateGoogleAuth() {

      try {
        this.deactivated = true

        // instantiate FirebaseAuth
        await new FirebaseAuth().reauthenticateWithGoogleAuth()

        this.setReauthenticatedModalHook()

        this.$store.commit('modal/closeModal')

      } catch(err) {
        this.deactivated = false
        this.error = "アカウントが間違っています。"
      }
    },
    async reauthenticateEmailAndPassword() {

      // validate password
      if(!this.password) {
        this.error = "パスワードを入力してください。"
        return
      }

      // start reauthentication
      try {
        this.deactivated = true
        
        // instantiate FirebaseAuth
        await new FirebaseAuth(this.password).reauthenticateWithCredential()
        
        this.setReauthenticatedModalHook()

        this.$store.commit('modal/closeModal')

      } catch(err) {
        this.deactivated = false
        this.error = "パスワードが間違っています。"
      }
      
    },
    async resendEmailVerification() {
      this.deactivated = true

      // instantiate FirebaseAuth
      await new FirebaseAuth(this.password).resendEmailVerification()

      this.message = `確認メールを${this.userEmail}宛に送信しました。`
    },
  },
  mounted() {
    this.modalHook = this.$store.getters['modal/modalHook']
    this.$store.commit('modal/resetModalHook')

    /* If the user has not verified their email address, send them a prompt to verify. 
    */
    if(!this.userVerified) {
      this.showResendVerification = true
    }

  },
}
</script>