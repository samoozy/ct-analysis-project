<template>
  <div class="xl:px-40 sm:px-10 px-5">
    <TheTitle title="レポート一覧" />

    <ul class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      
      <report-card 
        v-for="post in posts"
        :key="post.id" 
        :post="post"
      ></report-card>
        
    </ul>
  </div>

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
    },
  },
}
</script>