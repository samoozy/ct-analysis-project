<template>
  <div>
    <h1>Login</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  mounted() {
    const uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }

    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>