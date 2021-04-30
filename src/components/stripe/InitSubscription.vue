<template>

  <div class="flex flex-col items-center">
    <base-button
      mode="filled-lg"
      :isDisabled="deactivate"
      @emitClick="subscribeToPlan"
    >
      有料会員になる
    </base-button>
    <p class="text-sm">{{ message }}</p>
  </div>

</template>

<script>
import CheckoutService from '@/services/checkout'
import BaseButton from '@/components/ui/BaseButton'

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      deactivate: false,
      pricingPlanId: process.env.VUE_APP_STRIPE_PRICING_PLAN_ID,
      message: ''
    }
  },
  computed: {
    paidSubscriber() {
      return this.$store.getters['auth/paidSubscriber']
    },
  },
  watch: {
    paidSubscriber() {
      /**
       * Frontend validation
       * Disable the button if the user is already a paid subscriber
       */
      // this.alreadyPaidSubscriber()
    }
  },
  methods: {
    async subscribeToPlan() {
      try {

        // disable button and start loading screen
        this.deactivate = true
        this.$store.commit('ui/startLoading')
        
        // send data to backend
        const checkoutService = new CheckoutService(this.pricingPlanId)
        const session = await checkoutService.startSubscriptionCheckoutSession()

        // This will redirect the user if theyre not logged in
        if(!session) {
          this.deactivate = false
          this.$store.commit('ui/stopLoading')
          this.$store.commit('modal/openModal', 'register')
        }

        /**
         * Backend validation 
         * cancel the session if the user is already a subscriber
         */
        


        // redirect to stripe checkout page
        return await checkoutService.redirectToCheckout(session)

      } catch(err) {
        console.log(err)
        this.$store.commit('ui/stopLoading')
      }
    },
    alreadyPaidSubscriber() {
      this.deactivate = true
      this.message = "このアカウントは、有料会員に登録済みです"
    }
  },
  mounted() {
    if(this.paidSubscriber) {
      this.alreadyPaidSubscriber()
    }
  },
}
</script>

