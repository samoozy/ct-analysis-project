<template>

  <div v-if="provider.google && !provider.password">
    <div>メールアドレス・パスワード設定</div>
    <button class="border" @click="changePassword" :disabled="!show">パスワードを設定する</button>
  </div>
  <div  v-else-if="provider.password">
    <button class="border" @click="changePassword" :disabled="!show">パスワードを変更</button>
  </div>


  <!-- message -->
  <div v-if="show">
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <h1>LOADING...</h1>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import environments from "@/environments/environments"

export default {
  props: {
    provider: Object
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

        const res = await auth.sendPasswordResetEmail(user.email, actionCodeSettings)

        this.message = `確認メールを${user.email}宛に送りました。`

        this.show = true
        console.log(res)

      } catch(err) {

        this.show = true
        console.log(err)
      }

      return
    }
  }
}
</script>
