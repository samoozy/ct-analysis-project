<template>
  <div class="page-container">
    <TheTitle title="レポート一覧" />

    <ul class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      
      <report-card 
        v-for="post in posts"
        :key="post.id" 
        :post="post"
      ></report-card>
        
    </ul>

    <div v-if="!showMore" class="py-5 flex justify-center">
      <base-button mode="filled-lg" @emitClick="getMorePosts">さらに表示</base-button>
    </div>


  </div>

</template>

<script>
import ReportCard from '@/components/reports/ReportCard.vue'
import TheTitle from '@/components/layout/TheTitle'
import BaseButton from '@/components/ui/BaseButton'

export default {
  components: {
    ReportCard,
    TheTitle,
    BaseButton,
  },
  data() {
    return {
      posts: [],
      showMore: false,
    }
  },
  watch: {
    completed() {
      if(this.completed) {
        this.getInitialPosts()
      }
    }
  },
  computed: {
    completed() {
      return this.$store.getters['data/completed']
    },
  },
  methods: {
    getInitialPosts() {
      this.posts = this.$store.getters['posts/getInitialPosts']
    },
    getMorePosts() {
      this.showMore = true
      this.posts = this.$store.getters['posts/posts']
    },
  },
  mounted() {
    this.showMore = false

    if(this.completed) {
      this.getInitialPosts()
    }
  }
}
</script>