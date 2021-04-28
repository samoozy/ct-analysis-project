<template>
  
  <div v-if="!loggedIn">
      ログインしてください。
  </div>

  <div v-else>

    <div class="lg:flex">
      <div class="lg:w-3/12 lg:mr-8 h-full">
        <AccountNavigation />
      </div>
      <div class="lg:w-9/12 border p-12 rounded shadow-sm">
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
