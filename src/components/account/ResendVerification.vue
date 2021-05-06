<template>
  <div>
    <button 
      @click="resendEmailVerification"
      class="focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-indigo-600 text-sm"
      :disabled="loading"
    >
      認証メールを再送信する
    </button>
  </div>

  <p class="text-sm">{{ message }}</p>

</template>

<script>
import FirebaseAuth from "@/services/firebase-auth.service"

export default {
  data() {
    return {
      message: '',
      loading: false
    }
  },
  computed: {
    userEmail() {
      return this.$store.getters['auth/userEmail']
    },
  },
  methods: {
    async resendEmailVerification() {
      try {
        this.loading = true

        // instantiate FirebaseAuth
        const firebaseAuth = new FirebaseAuth(this.password)
        await firebaseAuth.resendEmailVerification()

        this.message = `確認メールを${this.userEmail}宛に送信しました。`
        this.loading = false

      } catch(err) {
        this.loading = false
        console.log(err)
      }
    }
  },
}
</script>