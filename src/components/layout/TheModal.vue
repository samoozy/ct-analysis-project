<template>
  <div v-if="isOpen">
    <div 
      class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
      @click="$emit('onClick')"
    ></div>

    <div 
      class="bg-white top-1/2 left-1/2 w-72 h-96 fixed -mt-48 -ml-36 sm:w-96 sm:-ml-48 rounded py-5 px-8 overflow-auto z-20"
    >

      <!-- close button -->
      <div class="flex justify-end">
        <button 
          class="focus:outline-none"
          @click="$emit('onClick')"
        >
          <svg 
            class="fill-current text-indigo-600"
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24"
          ><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </button>
      </div>

      <!-- login/registration -->
      <slot></slot>

    </div>
  </div>

</template>

<script>

export default {
  emits: ['onClick'],
  computed: {
    isOpen() {
      return this.$store.getters['modal/isOpen']
    }
  }
}
</script>
