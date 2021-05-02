<template>
  <div>
    <router-link 
      :class="mode"
      :to="dest"
    >
      <slot></slot>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
      default: 'filled',
    },
    dest: {
      type: String,
      required: true,
      default: '/',
    }
  },
}
</script>

<style lang="postcss" scoped>
.filled {
  @apply bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-800 duration-200 text-white text-sm border border-indigo-600 hover:border-indigo-800 flex items-center;
}

.ghost {
  @apply px-2 py-2 text-indigo-600 rounded text-sm hover:text-indigo-400 duration-200 border border-indigo-600 hover:border-indigo-400 flex items-center;
}

.filled-lg {
  @apply bg-indigo-600 px-5 py-2 rounded hover:bg-indigo-800 duration-200 text-white text-base border border-indigo-600 hover:border-indigo-800 flex items-center;
}

.ghost-lg {
  @apply px-5 py-2 text-indigo-600 rounded text-base hover:text-indigo-400 duration-200 border border-indigo-600 hover:border-indigo-400 flex items-center;
}
</style>