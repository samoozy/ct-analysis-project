<template>
  <div class="my-12">
    <h5 @click="toggleAnswer" class="font-bold text-xl flex items-center cursor-pointer">
      <svg v-if="!showAnswer" class="mr-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>

      <svg v-if="showAnswer" class="mr-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>

      <slot name="question"></slot>
    </h5>

    <div v-if="showAnswer" class="py-4" >
      <slot name="answer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAnswer: false
    }
  },
  methods: {
    toggleAnswer() {
      this.showAnswer = !this.showAnswer
    }
  }
}
</script>