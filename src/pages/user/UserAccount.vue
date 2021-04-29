<template>
  
  <div v-if="!loggedIn">
      ログインしてください。
  </div>

  <div v-else>

    <div class="lg:flex">
      <div class="lg:w-3/12 lg:mr-5 h-full">
        <AccountNavigation />
      </div>
      <div class="lg:w-9/12 lg:border lg:px-12 lg:py-4 lg:rounded lg:shadow border-t border-b border-gray-300">
        <router-view></router-view>
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
    isLoadingAuth() {
      return this.$store.getters['auth/isLoadingAuth']
    }
  },
  watch: {
    // deactivate loading screen
    isLoadingAuth() {
      this.$store.commit('ui/stopLoading')
    }
  },
  mounted() {
    // activate loading screen
    if(this.isLoadingAuth) {
      this.$store.commit('ui/startLoading')
    }
  }
}
</script>
