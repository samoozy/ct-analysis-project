<template>
  <button @click="linkToGoogleProvider">LINK TO GOOGLE</button>

  <p v-if="success">
    {{ message }}
  </p>

</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"

export default {
  data() {
    return {
      message: "",
      show: false
    }
  },
  methods: {
    async linkToGoogleProvider() {
      try {
        const user = firebase.auth().currentUser
        const googleProvider = new firebase.auth.GoogleAuthProvider()

        const result = await user.linkWithPopup(googleProvider)

        console.log(result)

        this.message = "グーグルと連携しました。"

        this.show = true

      } catch(err) {
        console.error()

        this.message = "連携に失敗しました。"
        this.show = true

      }

    }
  },
  mounted() {
    console.log(firebase.auth().currentUser)
  }
}
</script>