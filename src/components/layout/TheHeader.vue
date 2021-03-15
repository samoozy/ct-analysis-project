<template>
  <h1>HEADER</h1>
  <router-link to="/">Articles</router-link>
  <button 
    :disabled="!!checkoutInProgress"
    @click="subscribeToPlan"
  >Subscribe</button>
</template>

<script>
import CheckoutService from '@/services/checkout'

export default {
  data() {
    return {
      checkoutInProgress: false,
      pricingPlanId: 'price_1IVMerGbs0CRrGibwusy2nhQ'
    }
  },
  methods: {
    async subscribeToPlan() {
      try {
        const checkoutService = new CheckoutService(this.pricingPlanId)
  
        const session = await checkoutService.startSubscriptionCheckoutSession()

        return await checkoutService.redirectToCheckout(session)

      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>