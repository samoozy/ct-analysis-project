<template>

  <div v-if="provider.google && !provider.password">
    <button class="btn" @click="changePassword" :disabled="!show">パスワードを設定する</button>
  </div>
  <div  v-else-if="provider.password">
    <button class="btn" @click="changePassword" :disabled="!show">パスワードを変更する</button>
  </div>

  <!-- message -->
  <div>
    <p class="text-sm">{{ message }}</p>
  </div>

</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import environments from "@/environments/environments"

export default {
  props: {
    provider: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      show: true,
      message: ""
    }
  },
  methods: {
    async changePassword() {
      try {
        this.show = false

        const user = firebase.auth().currentUser
        const auth = firebase.auth()

        console.log(user.email)

        // set redirect url
        const actionCodeSettings = {
          url: environments.front.url
        }

        await auth.sendPasswordResetEmail(user.email, actionCodeSettings)

        this.message = `確認メールを${user.email}宛に送信しました。`
        this.show = true

      } catch(err) {

        this.show = true
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.btn {
  @apply focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-indigo-600 text-sm;
}
</style>