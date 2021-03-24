<template>
  <h1>コンテンツ一覧</h1>
  <div
    class="container"
    v-for="article in articles"
    :key="article.articleId"
  >
    

    <!-- link to individual article -->
    <router-link 
      class="article-link"
      :to="{
        path: `/articles/${article.url}`,
        query: {id: article.articleId}
      }"
    >
      <h3>{{ article.title }}</h3>
      <p>{{ article.description }}</p>
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

<style scoped>
  h1{
    color: steelblue;
  }

  .container {
    padding: 0.5rem 0;
  }

  .article-link {
    text-decoration: none;
  }

  h3 {
    color: steelblue;
    margin: 0;
  }

  p {
    color: #000;
    margin: 0;
  }
</style>
