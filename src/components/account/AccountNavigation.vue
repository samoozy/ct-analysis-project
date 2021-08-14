<template>
  <h3 class="font-bold text-xl mb-3 pl-2">アカウント情報</h3>

  <router-link 
    class="nav-link"
    :class="settingActive"
    to="/account"
  >アカウント設定</router-link>

  <!-- 有料プランが決まるまで一旦コメントアウト -->
  <!-- <router-link 
    class="nav-link" 
    :class="paymentActive" 
    to="/account/payment"
  >お支払い設定</router-link> -->

</template>

<script>
export default {
  computed: {
    settingActive() {

      return {
        active: this.$route.path === '/account/settings' || this.$route.path === '/account/settings/delete'
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
.active {
  @apply text-indigo-600 font-bold;
}

.nav-link {
  @apply block py-3 pl-2 rounded hover:bg-gray-200;
}
</style>