<template>
  <the-header></the-header>
  <div class="router-container">
    <router-view></router-view>
  </div>
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
  font-family: 'Noto Sans JP', sans-serif;
}

.router-container {
  padding: 0 3rem;
}
</style>
