<template>
  <button 
    :class="{
      'bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-800 duration-200 text-white text-sm focus:outline-none border border-indigo-600 hover:border-indigo-800' : filled,
      'px-2 py-2 text-indigo-600 rounded text-sm hover:text-indigo-400 duration-200 border border-indigo-600 hover:border-indigo-400 focus:outline-none' : ghost
    }"
    @click="$emit('emitClick')"
  >
    <div class="flex items-center">
      <slot></slot>
    </div>
    
  </button>
</template>

<script>
export default {
  emits: ['emitClick'],
  props: {
    mode: {
      type: String,
      required: true,
      default: 'filled'
    },
  },
  computed: {
    filled() {
      return this.mode === 'filled'
    },
    ghost() {
      return this.mode === 'ghost'
    }
  },
}
</script>