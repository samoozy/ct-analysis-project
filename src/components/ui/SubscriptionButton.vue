<template>
  
  <div>
    <button 
      class="border"
      :disabled="!!checkoutInProgress"
      @click="subscribeToPlan"
    >有料会員になる</button>
  </div>
  
</template>

<script>
import CheckoutService from '@/services/checkout'

export default {
  data() {
    return {
      checkoutInProgress: false,
      pricingPlanId: process.env.VUE_APP_STRIPE_PRICING_PLAN_ID
    }
  },
  methods: {
    async subscribeToPlan() {
      try {

        this.checkoutInProgress = true
        
        const checkoutService = new CheckoutService(this.pricingPlanId)
  
        const session = await checkoutService.startSubscriptionCheckoutSession()

        // This will redirect the user if theyre not logged in
        if(!session) {
          alert("グーグル認証を行ってください。")
          return this.$router.push('login')
        }

        return await checkoutService.redirectToCheckout(session)

      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

