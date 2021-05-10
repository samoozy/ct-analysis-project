<template>
  <div class="flex flex-col items-center mt-5 mb-10">
    <h1 class="text-3xl font-bold font-nunito-sans text-gray-700 text-center mb-3">{{ title }}</h1>
    <img class="h-14 w-auto" src="@/assets/icon-logo.png" alt="">
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