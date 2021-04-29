<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl text-gray-600">{{ title }}</h1>
    <img class="my-4 h-14 w-auto" src="@/assets/icon-logo.png" alt="">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>