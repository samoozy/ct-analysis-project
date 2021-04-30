<template>
  <LoadScreen />
  <the-header></the-header>
  <div class="xl:px-48 sm:px-10 px-5 mb-8">
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import LoadScreen from './components/layout/LoadScreen.vue'

export default {
  components: {
    TheHeader,
    LoadScreen
  },
  async created() {
    await this.$store.dispatch('data/loadData')
  }
}

</script>
