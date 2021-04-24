<template>
  <the-header></the-header>
  <div class="xl:px-48 sm:px-10 px-5 mb-8">
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  created() {
    this.$store.dispatch('auth/initAuth')
  }
}

</script>
