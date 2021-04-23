<template>
  <button 
    :class="{
      'bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-800 duration-200 text-white text-sm focus:outline-none border border-indigo-600 hover:border-indigo-800 disabled:opacity-50 disabled:pointer-events-none' : filled,
      'px-2 py-2 text-indigo-600 rounded text-sm hover:text-indigo-400 duration-200 border border-indigo-600 hover:border-indigo-400 focus:outline-none disabled:opacity-50 disabled:pointer-events-none' : ghost
    }"
    @click="$emit('emitClick')"
    :disabled="isDisabled"
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
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    filled() {
      return this.mode === 'filled'
    },
    ghost() {
      return this.mode === 'ghost'
    },
  },
}
</script>