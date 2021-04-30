<template>

  <router-link class="text-base flex items-center w-max" to="/">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg> 
    <span class="pl-2">レポート一覧に戻る</span>
  </router-link>

  <div v-if="completed">
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
    <div v-if="!loggedIn" class="flex flex-col justify-center items-center">
      <div class="my-4">
        <p class="text-center pt-2">リサーチレポートをダウンロードするには、会員登録が必要です。</p>
        <p class="text-center py-2">既にアカウントをお持ちの方はログインしてください。</p>
      </div>

      <base-button 
        class="mb-2" 
        mode="filled-lg"
        @emitClick="openAuthModal('register')"
      >今すぐ無料登録</base-button>

      <base-button
        mode="ghost-lg"
        @emitClick="redirectToPath('/promotion')"
      >有料プラン詳細</base-button>

    </div>

    <!-- if user has not verified email -->
    <div v-else-if="loggedIn && !userVerified"
    class="flex flex-col justify-center items-center">
      <div class="my-4">
        <p class="text-center pt-2">メールアドレスの承認を行ってください。</p>
        <p class="text-center py-2">アカウント作成時に{{ userEmail }} 宛てに確認メールを送信しました。</p>
      </div>

      <base-button
        mode="ghost-lg"
        @emitClick="redirectToPath('/account')"
      >アカウント情報</base-button>
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

      <base-button
        mode="ghost-lg"
        @emitClick="redirectToPath('/promotion')"
      >有料プラン詳細</base-button>
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
  </div>



</template>

<script>
import ReportService from '@/services/reports'
import DownloadButton from '@/components/ui/DownloadButton'
import BaseButton from '@/components/ui/BaseButton'

export default {
  components: {
    DownloadButton,
    BaseButton
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
    },
    completed() {
      return this.$store.getters['data/completed']
    }
  },
  data() {
    return {
      post: {},
      message: "",
      show: false,
      isLoading: false,
      isCompleted: false,
    }
  },
  watch: {
    completed() {
      if(this.completed) {
        this.loadPostById()
      }
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
    loadPostById() {
      this.post = this.$store.getters['posts/getPostById'](this.$route.params.reportId)
    },
    redirectToPath(path) {
      this.$router.push(path)
    },
    openAuthModal(mode) {
      this.$store.commit('modal/openModal', mode)
    }
  },
  async mounted() { 
    if(this.completed) {
      this.loadPostById()
    }

    // This is for resetting the loading spinner
    this.isLoading = false
    this.isCompleted = false

  }
}
</script>
