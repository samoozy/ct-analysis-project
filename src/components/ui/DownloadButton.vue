<template>
  <button 
    v-if="mode==='primary'"
    class="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded transition-colors ease-out duration-300 w-max my-2 disabled:pointer-events-none disabled:opacity-80 focus:outline-none"
  >
      <div class="relative">
        <div :class="`${loading || completed ? 'opacity-0' : ''} text-base text-white flex items-center`">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm3 8v3h-14v-3h-2v5h18v-5h-2z"/></svg>
          <span class="ml-2">
            <slot></slot>
          </span>
        </div>

        <div v-if="loading" class="absolute top-0 left-0 right-0 mx-auto w-6 h-full loading-spinner animate-spin"></div>  

        <div v-else-if="completed" class="absolute top-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>
        </div>
      </div>

  </button>
</template>

<script>
export default {
  props: {
    mode: String,
    loading: Boolean,
    completed: Boolean
  }
}
</script>

<style scoped>
/* This styling is for changing the color on each side of a border */
.loading-spinner {
  border-radius: 50%;
  border-left: 3px solid #C7D2FE;
  border-right: 3px solid #312E81;
  border-top: 3px solid #312E81;
  border-bottom: 3px solid #312E81;
}

svg {
  margin-left: auto;
  margin-right: auto;
  fill: #fff;
}
</style>

