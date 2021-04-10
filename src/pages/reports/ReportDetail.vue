<template>

  <router-link class="back-link" to="/">戻る</router-link>

  <div class="container">
    <img :src="post.imgUrl" alt="">
    <h2>{{ post.title }}</h2>
    <p>{{ post.date }}</p>
    <p>{{ post.type }}</p>
    <div v-html="post.content"></div>
  </div>

  <button class="btn" @click="openReportPdf">ダウンロード</button>

</template>

<script>
import ReportService from '@/services/reports'

export default {
  props: [
    'postId'
  ],
  data() {
    return {
      post: {},
      message: "有料プランのコンテンツです。ユーザーとして登録することでコンテンツの続きをお読みいただけます。",
      show: false
    }
  },
  methods: {
    showContent() {
      this.show = true
    },
    async openReportPdf() {
      const reportService = new ReportService(this.post.reportId)

      const session = await reportService.generateSignedUrl()

      console.log(session.signedUrl)
    }
  },
  mounted() {
    this.post = this.$store.getters['posts/getPostById'](this.postId)
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
  outline: none;
}

.content {
  font-size: 1.2rem;
  color: steelblue;
}

.btn:hover {
  opacity: 0.8;
}

</style>