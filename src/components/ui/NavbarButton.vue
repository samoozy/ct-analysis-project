<template>
  <button 
    v-if="mode === 'primary'"
    class="bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-800 duration-200 text-white text-sm focus:outline-none"
  >
    <div class="flex items-center">
      <slot></slot>
    </div>
  </button>

  <button 
    v-if="mode === 'secondary'"
    class="px-2 py-2 text-indigo-600 rounded text-sm hover:text-indigo-400 duration-200 border border-indigo-600 hover:border-indigo-400 focus:outline-none"
  >
    <div class="flex items-center">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    mode: String
  }
}
</script>