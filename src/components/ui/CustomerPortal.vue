<template>
  <button
    class="portal-btn"
    @click="openCustomerPortal"
    :disabled="!!portalInProgress"
  >カスタマーポータル</button>
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

<style scoped>
.portal-btn {
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

.portal-btn:hover,
.portal-btn:disabled {
  opacity: 0.8;
}
</style>