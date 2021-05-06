<template>
  <p>ユーザー認証を行ってください。</p>
  
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
    ><span class="w-full">確認</span></base-button>

    <error-message v-if="error">{{ error }}</error-message>
  </form>

</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import BaseButton from "@/components/ui/BaseButton"
import FormInput from "@/components/ui/FormInput"
import ErrorMessage from "@/components/ui/ErrorMessage"

export default {
  components: {
    BaseButton,
    FormInput,
    ErrorMessage,
  },
  data() {
    return {
      modalHook: '',
      password: '',
      error: '',
      deactivated: false,
    }
  },
  methods: {
    async reauthenticateEmailAndPassword() {
      await this.emailAndPasswordValidation()
      
    },
    async emailAndPasswordValidation() {

      /**
       * 1. Validate password
       */
      if(!this.password) {
        this.error = "パスワードを入力してください。"
      }

      /* 2. If the user has not verified their email address, send them a verification email and prompt them to verify before proceeding. 
       * 
       */

      const user = firebase.auth().currentUser

      return user


    },
    changeModalHook() {
      if(this.modalHook === 'delete') {
        this.$store.commit('modal/setModalHook', 'delete-reauthenticated')
      }
    },
  },
  mounted() {
    this.modalHook = this.$store.getters['modal/modalHook']
    this.$store.commit('modal/resetModalHook')

  },
}
</script>