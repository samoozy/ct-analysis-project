<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  mounted() {
    this.$store.dispatch('auth/initAuth')
  }
}

</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
