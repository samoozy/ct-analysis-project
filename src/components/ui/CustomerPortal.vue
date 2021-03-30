<template>
  <button
    class="portal-btn"
    @click="clickMe"
  >カスタマーポータル</button>
</template>

<script>
import CustomerPortal from '@/services/customer-portal'

export default {
  methods: {
    async clickMe() {
      const customerPortal = new CustomerPortal()

      const session = await customerPortal.startCustomerPortalSession()

      return session
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