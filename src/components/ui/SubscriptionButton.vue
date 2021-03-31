<template>
  <button 
    class="subscription-btn"
    :disabled="!!checkoutInProgress"
    @click="subscribeToPlan"
  >有料会員になる</button>
  
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

<style scoped>
.subscription-btn {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: steelblue;
  color: #fff;
  font-size: 1.1rem;
  box-shadow: 2px 2px 3px #D3D3D3;
  border-radius: 4px;
  outline: none;
}

.subscription-btn:hover,
.subscription-btn:disabled {
  opacity: 0.8;
}
</style>