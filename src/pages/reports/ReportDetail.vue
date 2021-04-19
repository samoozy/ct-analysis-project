<template>

  <router-link class="back-link" to="/">戻る</router-link>

  <div>
    <div class="flex justify-center py-5">
      <img class="rounded-lg" :src="post.imgUrl" alt="">
    </div>
    <h2 class="text-2xl font-bold my-3">{{ post.title }}</h2>
    <div>
      <span :class="`${post.type === '無料' ? `bg-gray-200` : `bg-yellow-300`} 
        w-max px-2 py-1 rounded-sm text-sm`">{{ post.type }} 
      </span>
      <span class="text-gray-500 ml-2">公開日：{{ post.date }}</span>
    </div>
    <div class="report-post-content" v-html="post.content"></div>
  </div>

  

  <p class="message">{{ message }}</p>

  <!-- if user is not logged in -->
  <div v-if="!loggedIn"
  class="flex flex-col justify-center items-center">
    <router-link 
      class="bg-indigo-600 px-5 py-2 text-white rounded text-lg hover:bg-indigo-800 duration-200 w-max my-2" 
      to="/"
    >会員登録する</router-link>
    <router-link 
      class="px-5 py-2 text-indigo-600 rounded text-lg hover:text-indigo-400 duration-200 w-max my-2 border-indigo-600 border hover:border-indigo-400" 
      to="/"
    >有料プラン詳細</router-link>
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

