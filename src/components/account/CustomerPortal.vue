<template>
  <div class="pt-5">
    <base-button
      @emitClick="openCustomerPortal"
      mode="filled"
      :disabled="portalInProgress || !paidSubscriber"
    >Stripe決済・サブスクリプション設定</base-button>
    <small class="block text-xs text-red-700">{{ errorMessage }}</small>
    <p class="text-sm" v-if="!paidSubscriber">
      Stripe決済の設定は有料会員のみ利用可能です。
      <router-link class="text-sm text-indigo-600" to="/promotion">有料プラン詳細</router-link>
    </p>
  </div>
</template>

<script>
import CustomerPortal from '@/services/customer-portal'
import BaseButton from '@/components/ui/BaseButton'

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      portalInProgress: false,
      errorMessage: ''
    }
  },
  computed: {
    paidSubscriber() {
      return this.$store.getters['auth/paidSubscriber']
    },
  },
  methods: {
    async openCustomerPortal() {
      this.portalInProgress = true
      this.$store.commit('ui/startLoading')

      const customerPortal = new CustomerPortal()

      const session = await customerPortal.startCustomerPortalSession()

      if(!session.success) {
        
        this.errorMessage = session.error
        this.portalInProgress = false

      } else {
        // Redirect the user to customer portal
        window.location.replace(session.url)
      }
    }
  }
}
</script>

