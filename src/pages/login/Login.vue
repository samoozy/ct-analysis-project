<template>
  <div>
    <h1>ログイン</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
  <button class="btn" @click="signout">
    サインアウト
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

<style scoped>
h1 {
  color: steelblue;
}

.btn {
  text-decoration: none;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: steelblue;
  color: #fff;
  font-size: 1.1rem;
  box-shadow: 2px 2px 3px #D3D3D3;
  border-radius: 4px;
}

.btn:hover {
  opacity: 0.8;
}
</style>