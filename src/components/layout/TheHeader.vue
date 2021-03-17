<template>
  <h1>HEADER</h1>

  <h2>USER: </h2>
  <img :src="user.userPhotoURL" alt="">

  <router-link class="nav-link" to="/">Articles</router-link>
  <router-link class="nav-link" to="/login">Login</router-link>
  <button 
    :disabled="!!checkoutInProgress"
    @click="subscribeToPlan"
  >Subscribe</button>

  <div>
    {{ user }}
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
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    async subscribeToPlan() {
      try {
        
        const checkoutService = new CheckoutService(this.pricingPlanId)
  
        const session = await checkoutService.startSubscriptionCheckoutSession()

        // This will redirect the user if theyre not logged in
        if(!session) {
          this.$router.push('login')
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
.nav-link {
  display: block;
  padding: 1rem;
}
</style>