<template>
  <div class="page-container bg-gray-50">
    <div v-if="!loggedIn">
      ログインしてください。
    </div>

    <div v-else>

      <div class="lg:flex">
        <div class="lg:w-3/12 lg:mr-5 h-full">
          <AccountNavigation />
        </div>
        <div class="lg:w-9/12 lg:px-12 lg:py-4 lg:rounded lg:shadow border-t border-b lg:border-none bg-white">
          <router-view></router-view>
        </div>
      </div>
      
    </div>
  </div>
  

</template>

<script>
import AccountNavigation from '@/components/account/AccountNavigation'

export default {
  components: {
    AccountNavigation
  },
  computed: {
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
  },
}
</script>
