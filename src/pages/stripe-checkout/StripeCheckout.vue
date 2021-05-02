<template>

  <div class="flex justify-center">
    <div class="w-full border shadow rounded py-5 px-8">
      <div class="text-center">
        <h1>{{ message }}</h1>
      </div>
    </div>
    
  </div>

</template>

<script>
import firestore from "@/firebase/firestore"

export default {
  data() {
    return {
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

            this.message = "ご購入が完了しました。"
            // setTimeout(() => this.$router.push('/'), 3000)
          } else if (doc.data().status === "ongoing") {
            /**
             * Start loading screen
             */
            this.$store.commit('ui/startLoading')

          }
        }, (error) => {
          console.log("Firestore onSnapshot error: ", error)
          this.$store.commit('ui/stopLoading')
        })

      } else {

        this.message = "ご購入がキャンセルされました。"
        // setTimeout(() => this.$router.push('/'), 3000)
      }
    }
  },
  async created() {
    await this.redirectAfterCheckout()
  }
}
</script>