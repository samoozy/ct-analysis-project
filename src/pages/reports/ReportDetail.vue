<template>

  <router-link class="back-link" to="/">戻る</router-link>

  <div class="container">
    <img :src="post.imgUrl" alt="">
    <h2>{{ post.title }}</h2>
    <p>{{ post.date }}</p>
    <p>{{ post.type }}</p>
    <div v-html="post.content"></div>
  </div>

  <p class="message">{{ message }}</p>

  <!-- if user is not logged in -->
  <div v-if="!loggedIn">
    <router-link to="/login">会員登録する</router-link>
  </div>

  <!-- if user has not verified email -->
  <div v-else-if="loggedIn && !userVerified">
    <p>{{ userEmail }} 宛てに確認メールを送信しました。</p>
  </div>

  <!-- if the user has no permission -->
  <div v-else-if="
    loggedIn && 
    userVerified && 
    !paidSubscriber && 
    post.type === '有料'"
  >
    <router-link to="/login">有料会員になる</router-link>
  </div>

  <!-- if user is a free subscriber -->
  <div v-else-if="
    loggedIn && 
    userVerified && 
    !paidSubscriber && 
    post.type === '無料'"
  >
    <p>無料ユーザー</p>
    <button class="btn" @click="openReportPdf">ダウンロード</button>
  </div>

  <!-- if the user is a paid subscriber -->
  <div v-else-if="
    loggedIn && 
    userVerified && 
    paidSubscriber"
  >
    <p>有料ユーザー</p>
    <button class="btn" @click="openReportPdf">ダウンロード</button>
  </div>

</template>

<script>
import ReportService from '@/services/reports'

export default {
  props: [
    'postId'
  ],
  computed: {
    userEmail() {
      return this.$store.getters['auth/userEmail']
    },
    userVerified() {
      return this.$store.getters['auth/userVerified']
    },
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
    paidSubscriber() {
      return this.$store.getters['auth/paidSubscriber']
    }
  },
  data() {
    return {
      post: {},
      message: "",
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

.message {
  font-size: 1.2rem;
}

</style>