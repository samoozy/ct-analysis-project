<template>

  <!-- <div class="misc">id: {{ id }}<br>query: {{ query }}</div> -->
  <router-link class="back-link" to="/">戻る</router-link>

  <div class="container">
    <h2>{{ selectedArticle.title }}</h2>
    <p>{{ selectedArticle.description }}</p>
  </div>


  <p class="content" v-if="show">{{ articleContent.content }}</p>
  <a class="btn" v-if="show && articleContent.downloadUrl" :href="articleContent.downloadUrl">有料リンク</a>

  <button class="btn" v-else-if="!show" @click="showContent">有料コンテンツの表示</button>

</template>

<script>
import firestore from '@/firebase/firestore'

export default {
  props: ['id', 'query'],
  data() {
    return {
      selectedArticle: null,
      articleContent: {
        content: "有料プランのコンテンツです。ユーザーとして登録することでコンテンツの続きをお読みいただけます。"
      },
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

<style scoped>
.back-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
}

.misc {
  font-size: 0.8rem;
}

h2 {
  color: steelblue;
}

.btn {
  text-decoration: none;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: steelblue;
  color: #fff;
  font-size: 1.1rem;
  box-shadow: 2px 2px 3px #D3D3D3;
  border-radius: 4px;
}

.content {
  font-size: 1.2rem;
  color: steelblue;
}

.btn:hover {
  opacity: 0.8;
}

</style>