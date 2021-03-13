<template>
  <p>{{ id }}</p>
  <p>{{ query }}</p>
  <div>{{ selectedArticle }}</div>


  <p v-if="show">{{ articleContent }}</p>

  <button v-else-if="!show" @click="showContent">Show content</button>

</template>

<script>
import firestore from '@/firebase/firestore'

export default {
  props: ['id', 'query'],
  data() {
    return {
      selectedArticle: null,
      articleContent: null,
      show: false
    }
  },
  methods: {
    showContent() {
      this.show = true
    },
    async loadArticleContent() {
      const contentCollection = await firestore.collection('articles').doc(this.query).collection('content').get()

      contentCollection.forEach(doc => {
        this.articleContent = doc.data()
      })
    }
  },
  async created() {
    this.selectedArticle = this.$store.getters['articles/articles'].find((article) => article.articleId === this.query)

    await this.loadArticleContent()
  }
}
</script>
