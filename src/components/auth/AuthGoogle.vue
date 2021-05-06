<template>
  <google-auth-button @emitClick="initGoogleAuthProvider">
    {{ buttonText }}
  </google-auth-button>
</template>

<script>
import FirebaseAuth from "@/services/firebase-auth.service"
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
      
      // Instantiate FirebaseAuth
      await new FirebaseAuth().signInWithGoogleAuth()

      this.$store.commit('modal/closeModal')

    },
  },
}
</script>