<template>
  <button 
    :class="mode"
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
}
</script>

<style lang="postcss" scoped>
.filled {
  @apply bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-800 duration-200 text-white text-sm focus:outline-none border border-indigo-600 hover:border-indigo-800 disabled:opacity-50 disabled:pointer-events-none;
}

.ghost {
  @apply px-2 py-2 text-indigo-600 rounded text-sm hover:text-indigo-400 duration-200 border border-indigo-600 hover:border-indigo-400 focus:outline-none disabled:opacity-50 disabled:pointer-events-none;
}

.filled-lg {
  @apply bg-indigo-600 px-5 py-2 rounded hover:bg-indigo-800 duration-200 text-white text-base focus:outline-none border border-indigo-600 hover:border-indigo-800 disabled:opacity-50 disabled:pointer-events-none;
}

.ghost-lg {
  @apply px-5 py-2 text-indigo-600 rounded text-base hover:text-indigo-400 duration-200 border border-indigo-600 hover:border-indigo-400 focus:outline-none disabled:opacity-50 disabled:pointer-events-none;
}

.filled-red {
  @apply bg-red-600 px-3 py-2 rounded hover:bg-red-800 duration-200 text-white text-sm focus:outline-none border border-red-600 hover:border-red-800 disabled:opacity-50 disabled:pointer-events-none;
}

.ghost-red {
  @apply px-2 py-2 text-red-600 rounded text-sm hover:text-red-400 duration-200 border border-red-600 hover:border-red-400 focus:outline-none disabled:opacity-50 disabled:pointer-events-none;
}

</style>