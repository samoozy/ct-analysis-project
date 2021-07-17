<template>

  <div class="page-container">
    <back-button @emitClick="$router.push('/reports')">レポート一覧</back-button>

    <div v-if="completed" class="mb-16 sm:mb-20">
      <div>
        <div class="flex justify-center py-5">
          <img class="rounded-lg" :src="post.imgUrl" alt="">
        </div>
        <h2 class="text-xl lg:text-2xl font-bold my-3">{{ post.title }}</h2>
        <div>
          <span :class="`${post.type === '無料' ? `bg-gray-200` : `bg-yellow-300`} 
            w-max px-2 py-1 rounded-sm text-sm`">{{ post.type }} 
          </span>
          <span class="text-gray-500 ml-2">公開日：{{ post.date }}</span>
        </div>
        <!-- 無料ユーザー用のダウンロードボタン -->
        <div v-if="
          loggedIn && 
          userVerified && 
          !paidSubscriber && 
          post.type === '無料'"
          class="flex flex-col justify-center items-center mt-8"
        >
          <download-button 
            v-if="!urlReady"
            :mode="`primary`"
            :loading="isLoading"
            :completed="isCompleted"
            :disabled="isLoading || isCompleted"
            @click="openReportPdf"
          >
            レポートリンクを発行
          </download-button>
          <a class="text-indigo-600 flex text-base" v-if="urlReady" :href="url" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="26" height="26" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
            <span class="ml-1">PDFファイルを開く</span>
          </a>

        </div>
        <!-- 有料ユーザー用のダウンロードボタン -->
        <div v-else-if="
          loggedIn && 
          userVerified && 
          paidSubscriber"
          class="flex flex-col justify-center items-center mt-8"
        >
          <download-button 
            v-if="!urlReady"
            :mode="`primary`"
            :loading="isLoading"
            :completed="isCompleted"
            :disabled="isLoading || isCompleted"
            @click="openReportPdf"
          >
            レポートリンクを発行
          </download-button>
          <a class="text-indigo-600 flex text-base" v-if="urlReady" :href="url" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="26" height="26" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
            <span class="ml-1">PDFファイルを開く</span>
          </a>
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

        <div>
          <p class="text-center py-4 mb-5">下記のボタンを押すとPDFファイルのリンクが発行されます。</p>
        </div>

        <download-button 
          v-if="!urlReady"
          :mode="`primary`"
          :loading="isLoading"
          :completed="isCompleted"
          :disabled="isLoading || isCompleted"
          @click="openReportPdf"
        >
          リンクを発行する
        </download-button>

        <a class="text-indigo-600 flex text-base" v-if="urlReady" :href="url" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="26" height="26" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
          <span class="ml-1">PDFファイルを開く</span>
        </a>

      </div>

      <!-- if the user is a paid subscriber -->
      <div v-else-if="
        loggedIn && 
        userVerified && 
        paidSubscriber"
        class="flex flex-col justify-center items-center"
      >
        
        <div>
          <p class="text-center py-4 mb-5">下記のボタンを押すとPDFファイルのリンクが発行されます。</p>
        </div>

        <download-button 
          v-if="!urlReady"
          :mode="`primary`"
          :loading="isLoading"
          :completed="isCompleted"
          :disabled="isLoading || isCompleted"
          @click="openReportPdf"
        >
          リンクを発行する
        </download-button>

        <a class="text-indigo-600 flex text-base" v-if="urlReady" :href="url" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="26" height="26" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/></svg>
          <span class="ml-1">PDFファイルを開く</span>
        </a>

      </div>
    </div>
  </div>



</template>

<script>
import ReportService from '@/services/reports.service'
import DownloadButton from '@/components/ui/DownloadButton'
import BaseButton from '@/components/ui/BaseButton'
import BackButton from '@/components/ui/BackButton'


export default {
  components: {
    DownloadButton,
    BaseButton,
    BackButton
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
      url: "",
      urlReady: false,
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
      this.url = session.signedUrl
      this.urlReady = true

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
  mounted() {

    if(this.completed) {
      this.loadPostById()
    }

    // This is for resetting the loading spinner
    this.isLoading = false
    this.isCompleted = false

  }
}
</script>
