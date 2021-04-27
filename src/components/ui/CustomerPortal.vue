<template>
  <div>
    <button
    class="border"
    @click="openCustomerPortal"
    :disabled="!!portalInProgress"
  >カスタマーポータル</button>
  </div>
</template>

<script>
import CustomerPortal from '@/services/customer-portal'

export default {
  data() {
    return {
      portalInProgress: false
    }
  },
  methods: {
    async openCustomerPortal() {
      this.portalInProgress = true

      const customerPortal = new CustomerPortal()

      const session = await customerPortal.startCustomerPortalSession()

      if(!session.success) {
        
        alert(session.error)

      } else {
        // Redirect the user to customer portal
        window.location.replace(session.url)
      }
    }
  }
}
</script>

