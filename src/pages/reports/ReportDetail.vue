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
  <div v-if="permission == 0">
    <router-link to="/login">会員登録する</router-link>
  </div>

  <!-- if user has not verified email -->
  <div v-else-if="permission == -2">
    <p>{{ user.email }} 宛てに確認メールを送信しました。</p>
  </div>

  <!-- if the user has no permission -->
  <div v-else-if="permission == -1">
    <router-link to="/login">有料会員になる</router-link>
  </div>

  <!-- if user is a free subscriber -->
  <div v-else-if="permission == 1">
    <button class="btn" @click="openReportPdf">ダウンロード</button>
  </div>

  <!-- if the user is a paid subscriber -->
  <div v-else-if="permission == 2">
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
    user() {
      return this.$store.getters['auth/user']
    }
  },
  data() {
    return {
      post: {},
      metaInfo: {},
      permission: 0,
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
    setMetaInfoAndPermission(loggedIn, paidSubscriber, postType, userVerified) {
      this.metaInfo = {
        loggedIn,
        paidSubscriber,
        postType,
        userVerified
      }

      console.log(this.metaInfo.loggedIn)

      

      !this.metaInfo.loggedIn ? 
        this.permission = 0 : !this.metaInfo.userVerified ? 
          this.permission = -2 : this.metaInfo.paidSubscriber ? 
            this.permission = 2 : this.metaInfo.postType === "無料" ? 
              this.permission = 1 : this.permission = -1
      

    },
    setMessage() {
      switch(this.permission) {
        case 0:
          this.message = "ユーザー登録を行ってください。"
          break
        case -2:
          this.message = "メールアドレスの認証を行ってください"
          break
        case -1:
          this.message = "有料コンテンツです。有料会員のみ閲覧可能"
          break
        case 1:
          this.message = "無料ユーザーとしてアクセス"
          break
        case 2:
          this.message = "有料ユーザーとしてアクセス"
          break
        default:
          this.message = "something went wrong..."
      }
    }
  },
  mounted() {
    this.post = this.$store.getters['posts/getPostById'](this.postId)

    this.setMetaInfoAndPermission(
      this.$store.getters['auth/loggedIn'], 
      this.$store.getters['auth/paidSubscriber'],
      this.post.type,
      this.user.verified
    )

    this.setMessage()

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