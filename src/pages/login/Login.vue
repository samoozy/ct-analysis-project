<template>
  <div>
    <h1>Login</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
  <button @click="signout">
    Signout
  </button>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  methods: {
    signout() {
      console.log('signing out')
      firebase.auth().signOut()

      this.$store.commit('auth/resetUser')
      this.$router.push('/articles')
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        return
      } else {
        const uiConfig = {
          signInSuccessUrl: "/",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ]
        }

        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', uiConfig)
    }
      
    })
    }
}
</script>