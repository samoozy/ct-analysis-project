<template>
  <google-auth-button @emitClick="initGoogleAuthProvider">
    {{ buttonText }}
  </google-auth-button>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import GoogleAuthButton from "@/components/ui/GoogleAuthButton"

export default {
  components: {
    GoogleAuthButton,
  },
  props: {
    buttonText: {
      type: String,
      required: true,
      default: "Google",
    }
  },
  methods: {
    async initGoogleAuthProvider() {

      // initiate google account auth
      const provider = new firebase.auth.GoogleAuthProvider()
      // set language to Japanese
      firebase.auth().languageCode = 'ja'

      await firebase.auth().signInWithPopup(provider)

      this.$store.commit('modal/closeModal')

    },
  },
}
</script>