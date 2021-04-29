<template>
  <TheTitle title="レポート一覧" />

  <ul class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
    
    <report-card 
      v-for="post in posts"
      :key="post.id" 
      :post="post"
    ></report-card>
      
  </ul>

  
</template>

<script>
import ReportCard from '@/components/reports/ReportCard.vue'
import TheTitle from '@/components/layout/TheTitle'

export default {
  components: {
    ReportCard,
    TheTitle
  },
  computed: {
    posts() {
      return this.$store.getters['posts/posts']
    }
  },
  async mounted() {

    await this.$store.dispatch('posts/loadPosts')

  }
}
</script>