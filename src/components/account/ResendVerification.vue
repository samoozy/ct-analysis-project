<template>
  <div>
    <button 
      @click="resendEmailVerification"
      class="focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-indigo-600 text-sm"
      :disabled="loading"
    >
      認証メールを再送信する
    </button>
  </div>

  <p class="text-sm">{{ message }}</p>

</template>

<script>
import environments from "@/environments/environments"
import firebase from "firebase/app"
import "firebase/auth"

export default {
  data() {
    return {
      message: '',
      loading: false
    }
  },
  methods: {
    async resendEmailVerification() {
      try {
        this.loading = true

        const user = firebase.auth().currentUser

        // set redirect url
        const actionCodeSettings = {
          url: environments.front.url
        }

        await user.sendEmailVerification(actionCodeSettings)

        this.message = `認証メールを${user.email}宛に送信しました。`
        this.loading = false

      } catch(err) {

        this.loading = false
        console.log(err)
      }
    }
  },
}
</script>