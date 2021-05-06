<template>
  <p class="text-sm">ユーザー登録されているメールアドレスを入力してください。パスワードリセットのリンクをメールアドレス宛に送信します。</p>

  <form @submit.prevent="sendResetPassword">
    <div class="my-2">
      <FormInput 
        v-model="email"
        type="email"
        id="email"
        name="メールアドレス"
      />
    </div> 

    <base-button 
      class="w-full"
      mode="filled-lg"
      :isDisabled="deactivated"
    >
      <span class="w-full">送信</span>
    </base-button>

    <error-message v-if="error">{{ error }}</error-message>

    <small
      v-if="sent"
      class="block text-sm"
    >
      {{ sent }}
    </small>
  </form>

</template>

<script>
import FirebaseAuth from "@/services/firebase-auth.service"
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
      email: '',
      error: '',
      sent: '',
      deactivated: false,
    }
  },
  methods: {
    async sendResetPassword() {

      if(!this.email) {
        this.error = 'メールアドレスを入力してください。'
        return
      }

      try {
        this.deactivated = true

        await new FirebaseAuth(...Array(1), this.email).sendResetPasswordEmail()
        
        this.sent = `パスワードリセットのリンクを送信しました。`

      } catch(err) {
        console.log(err)
      }
    },
  },
}
</script>