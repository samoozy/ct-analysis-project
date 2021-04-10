<template>
  <div 
    v-for="post in posts"
    :key="post.id"
  >
    <router-link
      :to="`/reports/${post.id}`"
    >
      <img 
        :src="post.imgUrl" 
        alt=""
      >
      <h3>{{ post.title }}</h3>
      <div>{{ post.type }}</div>
      <div>{{ post.date }}</div>
    </router-link>
    
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters['posts/posts']
    }
  },
  async created() {
    await this.$store.dispatch('posts/loadPosts')
  }
}
</script>

<style scoped>
  img {
    height: 100px;
  }
</style>
