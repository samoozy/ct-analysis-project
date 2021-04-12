<template>
  <div class="google-auth">
    <button @click="initGoogleAuthProvider">GOOGLE AUTH</button>
  </div>

  {{ mode }}

  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">メールアドレス</label>
      <input type="email" id="email" v-model="email">
    </div>
    <div class="form-control">
      <label for="password">パスワード</label>
      <input type="password" id="password" v-model="password">
    </div>
    <button>登録する</button>
  </form>

</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"

export default {
  props: {
    mode: String
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async initGoogleAuthProvider() {
      // initiate google account auth
      const provider = new firebase.auth.GoogleAuthProvider()

      // set language to Japanese
      firebase.auth().languageCode = 'ja'

      const result = await firebase.auth().signInWithPopup(provider)

      const credential = result.credential
      const token = result.accessToken
      const user = result.user

      console.log(credential, token, user)

    },
    async registerUserWithEmailAndPassword() {
      // create User with email and password
      try {
        const userCredential =  await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)

        return userCredential.user

      } catch(err) {
        console.error()
      }

    },
    async signInWithEmailAndPassword() {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)

        return userCredential.user
      } catch(err) {
        console.error()
      }
    },
    async submitForm() {
      if(this.mode === "register") {
        const user = await this.registerUserWithEmailAndPassword()
        console.log(user)
      } else if (this.mode === "login") {
        const user = await this.signInWithEmailAndPassword()
        console.log(user)
      }
    }
  }
}
</script>

<style scoped>

form {
  padding: 1rem 0;
}
label {
  display: block;
}
</style>