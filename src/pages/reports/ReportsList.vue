<template>
  <h1 class="text-center mb-8 text-2xl">レポート一覧</h1>

  <ul class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
    
    <report-card 
      v-for="post in posts"
      :key="post.id" 
      :post="post"
    ></report-card>
      
  </ul>

  
</template>

<script>
import ReportCard from '@/components/ui/ReportCard.vue'

export default {
  components: {
    ReportCard
  },
  computed: {
    posts() {
      return this.$store.getters['posts/posts']
    }
  },
  async mounted() {
    this.$store.commit('ui/startLoading')
    await this.$store.dispatch('posts/loadPosts')
    this.$store.commit('ui/stopLoading')
  }
}
</script>