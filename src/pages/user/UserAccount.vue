<template>
  
  <div v-if="!loggedIn">
      ログインしてください。
  </div>


  <div v-else>

    <div class="flex">


      <div class="h-full w-3/12">
        <AccountNavigation />
      </div>


      <div class="w-9/12 border p-8">

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
  data() {
    return {

    }
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

<style scoped lang="postcss">

</style>