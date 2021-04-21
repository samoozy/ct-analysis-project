<template>
  <router-link
    v-if="mode === 'primary'"
    :to="dest"
    class="bg-indigo-600 px-5 py-2 text-white rounded text-base hover:bg-indigo-800 duration-200 w-max mb-2"
  >
    <slot></slot>
  </router-link>

  <router-link
    v-else-if="mode === 'secondary'"
    :to="dest"
    class="px-5 py-2 text-indigo-600 rounded text-base hover:text-indigo-400 duration-200 w-max border-indigo-600 border hover:border-indigo-400 mb-2"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: String,
    dest: String
  }
}
</script>