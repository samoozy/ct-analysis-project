<template>

    <transition name="fade">
      <div v-if="loading">
        <div class="fixed top-0 left-0 w-full h-full bg-white z-50">
          <div class="flex h-full items-center justify-center">
            <img class="h-20 w-auto animate-bounce" src="@/assets/icon-logo-sm.png" alt="">
          </div>
        </div>
      </div>
    </transition>



</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['ui/loading']
    },
  },
}
</script>

<style scoped>
.fade-enter-active, 
.fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, 
.fade-leave-to {
  opacity: 0;
}

</style>