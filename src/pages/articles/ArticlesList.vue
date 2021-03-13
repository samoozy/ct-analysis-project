<template>
  <h1>Article List</h1>
  <div
    v-for="article in articles"
    :key="article.articleId"
  >
    <h3>{{ article.title }}</h3>
    <p>{{ article }}</p>

    <!-- link to individual article -->
    <router-link 
      :to="{
        path: `/articles/${article.url}`,
        query: {id: article.articleId}
      }"
    >
      {{ article.articleId }}
    </router-link>

  </div>
</template>

<script>
export default {
  computed: {
    articles() {
      return this.$store.getters['articles/articles']
    }
  },
  async created() {
    await this.$store.dispatch('articles/loadArticles')
  }
}
</script>
