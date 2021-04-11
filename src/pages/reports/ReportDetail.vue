<template>

  <router-link class="back-link" to="/">戻る</router-link>

  <div class="container">
    <img :src="post.imgUrl" alt="">
    <h2>{{ post.title }}</h2>
    <p>{{ post.date }}</p>
    <p>{{ post.type }}</p>
    <div v-html="post.content"></div>
  </div>

  LoggedIn: {{ loggedIn }}
  PaidSubscriber: {{ paidSubscriber }}

  <!-- if user is not logged in -->
  

    <!-- if the report is free -->
  


    <!-- if the report is for paid subscribers only -->
    
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
      metaInfo: {},
      permission: 0,
      message: "ユーザー登録を行ってください。",
      show: false,
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
    },
    setMetaInfoAndPermission(loggedIn, paidSubscriber, postType) {
      this.metaInfo = {
        loggedIn,
        paidSubscriber,
        postType
      }

      !this.metaInfo.loggedIn ? 
        this.permission = 0 : this.metaInfo.paidSubscriber ? 
          this.permission = 2 : this.metaInfo.postType === "無料" ? 
            this.permission = 1 : this.permission = -1
    }
  },
  mounted() {
    this.post = this.$store.getters['posts/getPostById'](this.postId)

    this.setMetaInfoAndPermission(
      this.$store.getters['auth/loggedIn'], 
      this.$store.getters['auth/paidSubscriber'],
      this.post.type
    )

    console.log(this.permission)
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