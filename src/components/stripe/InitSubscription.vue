<template>

  <div class="flex flex-col items-center">
    <base-button
      mode="filled-lg"
      :isDisabled="deactivate"
      @emitClick="initSubscribe"
    >
      有料会員になる
    </base-button>
    <p class="text-sm">{{ message }}</p>
  </div>

</template>

<script>
import CheckoutService from '@/services/checkout.service'
import BaseButton from '@/components/ui/BaseButton'
import environments from '@/environments/environments'

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      deactivate: false,
      pricingPlanId: environments.stripe.pricingPlanId,
      message: ''
    }
  },
  computed: {
    paidSubscriber() {
      return this.$store.getters['auth/paidSubscriber']
    },
    userVerified() {
      return this.$store.getters['auth/userVerified']
    },
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
    modalHook() {
      return this.$store.getters['modal/modalHook']
    },
  },
  watch: {
    modalHook() {
      if(this.modalHook === 'subscribe-reauthenticated') {
        this.subscribeToPlan()
      }
    }
  },
  methods: {
    initSubscribe() {

      if(!this.loggedIn) {
        this.$store.commit('modal/openModal', 'login')
        return
      }

      this.$store.commit('modal/openModal', 'reauthenticate')
      this.$store.commit('modal/setModalHook', 'subscribe')
    },
    async subscribeToPlan() {
      try {

        /**
         * email not verified
         */
        // if(this.loggedIn && !this.userVerified) {
        //   this.message = "メールアドレスの認証を行ってください"
        //   return
        // }

        /**
         * already a paid subscriber
         */
        // if(this.paidSubscriber) {
        //   this.message = "このアカウントは、有料会員に登録済みです"
        //   this.deactivate = true
        //   return
        // }

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

        // redirect to stripe checkout page
        return await checkoutService.redirectToCheckout(session)

      } catch(err) {
        console.log(err)
        this.$store.commit('ui/stopLoading')
      }
    },
  },
}
</script>

