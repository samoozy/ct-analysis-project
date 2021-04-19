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


  <p class="text-center">{{ message }}</p>

  <!-- if user is not logged in -->
  <div v-if="!loggedIn"
  class="flex flex-col justify-center items-center">
    <div class="my-4">
      <p class="text-center pt-2">リサーチレポートをダウンロードするには、会員登録が必要です。</p>
      <p class="text-center py-2">既にアカウントをお持ちの方はログインしてください。</p>
    </div>
    
    <router-button 
      :dest="`/`"
      :mode="`primary`"
    >
      今すぐ無料登録
    </router-button>

    <router-button 
      :dest="`/`"
      :mode="`secondary`"
    >
      有料プラン詳細
    </router-button>
  </div>

  <!-- if user has not verified email -->
  <div v-else-if="loggedIn && !userVerified"
  class="flex flex-col justify-center items-center">
    <div class="my-4">
      <p class="text-center pt-2">メールアドレスの承認を行ってください。</p>
      <p class="text-center py-2">アカウント作成時に{{ userEmail }} 宛てに確認メールを送信しました。</p>
    </div>
    <router-button
      :dest="`/account`"
      :mode="`secondary`"
    >
      もう一度承認メールを送る
    </router-button>
  </div>

  <!-- if the user has no permission -->
  <div v-else-if="
    loggedIn && 
    userVerified && 
    !paidSubscriber && 
    post.type === '有料'"
    class="flex flex-col justify-center items-center"
  > 
    <div class="my-4">
      <p class="text-center pt-2">このレポートは有料コンテンツです。</p>
      <p class="text-center py-4">有料会員に登録すると、ダウンロードすることができます。</p>
    </div>
    
    <router-button
      :dest="`/`"
      :mode="`secondary`"
    >
      有料プラン詳細
    </router-button>
  </div>

  <!-- if user is a free subscriber -->
  <div v-else-if="
    loggedIn && 
    userVerified && 
    !paidSubscriber && 
    post.type === '無料'"
    class="flex flex-col justify-center items-center"
  >
    <download-button
      :mode="`primary`"
      :loading="isLoading"
      :completed="isCompleted"
      :disabled="isLoading || isCompleted"
      @click="openReportPdf"
    >
      ダウンロード
    </download-button>

  </div>

  <!-- if the user is a paid subscriber -->
  <div v-else-if="
    loggedIn && 
    userVerified && 
    paidSubscriber"
  >
    <download-button
      :mode="`primary`"
      :loading="isLoading"
      :completed="isCompleted"
      :disabled="isLoading || isCompleted"
      @click="openReportPdf"
    >
      ダウンロード
    </download-button>
  </div>

</template>

<script>
import ReportService from '@/services/reports'
import RouterButton from '@/components/ui/RouterButton'
import DownloadButton from '@/components/ui/DownloadButton'

export default {
  components: {
    RouterButton,
    DownloadButton
  },
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
      isLoading: false,
      isCompleted: false
    }
  },
  methods: {
    showContent() {
      this.show = true
    },
    async openReportPdf() {
      // disable the button
      this.isLoading = true

      const reportService = new ReportService(this.post.reportId)

      const session = await reportService.generateSignedUrl()

      console.log(session.signedUrl)

      this.isCompleted = true
      this.isLoading = false
    },
  },
  mounted() {
    this.post = this.$store.getters['posts/getPostById'](this.postId)
    this.isLoading = false
    this.isCompleted = false
  }
}
</script>
