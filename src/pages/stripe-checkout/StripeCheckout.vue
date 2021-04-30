<template>
  <h1>{{ message }}</h1>
</template>

<script>
import firestore from "@/firebase/firestore"

export default {
  data() {
    return {
      wait: true,
      message: ""
    }
  },
  methods: {
    async redirectAfterCheckout() {
      const purchaseResult = this.$route.query.purchaseResult
    
      if(purchaseResult === "success") {
        const ongoingPurchaseSessionId = this.$route.query.ongoingPurchaseSessionId

        // onSnapshot is a listener function
        // When the status changes to completed, show the message and redirect the user after 3seconds
        await firestore.collection('purchaseSessions').doc(ongoingPurchaseSessionId).onSnapshot((doc) => {
          if(doc.data().status === "completed") {
            this.wait = false
            this.message = "登録に成功しました。"
            setTimeout(() => this.$router.push('/'), 3000)
          } else if (doc.data().status === "ongoing") {
            this.message = "登録中、、、"
          }
        }, (error) => {
          console.log("Firestore onSnapshot error: ", error)
        })
      } else {
        this.wait = false
        this.message = "登録に失敗しました。"
        setTimeout(() => this.$router.push('/'), 3000)
      }
    }
  },
  async created() {
    await this.redirectAfterCheckout()
  }
}
</script>