<template>
  <h3 class="title">アカウント情報</h3>

  <router-link 
    class="nav-link"
    :class="settingActive"
    to="/account"
  >アカウント設定</router-link>

  <router-link 
    class="nav-link" 
    :class="paymentActive" 
    to="/account/payment"
  >お支払い設定</router-link>

</template>

<script>
export default {
  computed: {
    settingActive() {
      return {
        active: this.$route.path === '/account/settings'
      }
    },
    paymentActive() {
      return {
        active: this.$route.path === '/account/payment'
      }
    },
  }
}
</script>

<style scoped lang="postcss">
.title {
  @apply font-bold text-xl mb-8 pl-2;
}

.active {
  @apply text-indigo-600 font-bold;
}

.nav-link {
  @apply block py-3 pl-2 hover:bg-gray-100 rounded;
}
</style>