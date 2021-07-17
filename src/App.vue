<template>
  <LoadScreen />
  <TheHeader />
  <div>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
  <TheFooter />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import LoadScreen from './components/layout/LoadScreen.vue'
import TheFooter from './components/layout/TheFooter'

export default {
  components: {
    TheHeader,
    LoadScreen,
    TheFooter,
  },
  created() {

    /**
     * load auth data and reports data
     */
    this.$store.dispatch('data/loadData')
  }
}

</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.route-enter-active {
  transition: all 0.2s ease-in;
}

.route-leave-active {
  transition: all 0.2s ease;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>