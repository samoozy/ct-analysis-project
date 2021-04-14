<template>
  <button @click="changePassword" :disabled="!show">CHANGE PASSWORD</button>
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


      // try {
      //   this.show = false

      //   const reAuthenticate = await user.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())

      //   this.show = true

      //   console.log(reAuthenticate)
      // } catch(err) {
      //   this.show = true
      //   this.message = err.message
      //   console.log(err.message)
      // }

      


      // only allow email and password users to change their password
      // user.providerData.forEach(async profile => {
      //   if(profile.providerId === "password") {
      //     const updatePasswordReq = await user.updatePassword('test123')

      //     return updatePasswordReq
      //   } else {
      //     console.log("only allowed for user pass users")
      //   }
      // })

      return
    }
  }
}
</script>