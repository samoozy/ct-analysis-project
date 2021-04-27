<template>
  

  <div v-if="!loggedIn">
      ログインしてください。
  </div>


  <div v-else>

    <div class="grid grid-cols-2">


      <div class="items-center h-full">
        <h5>アカウント情報</h5>
        <div>アカウント設定</div>
        <div>お支払い設定</div>
      </div>


      <div class="content-container">
        
        <div class="wrapper">
          <h5>メールアドレス</h5>

          <p>{{ user.email }}</p>
          <change-password :provider="provider"></change-password>

        </div>

        <div class="wrapper">
          <h5>メールアドレス認証</h5>
          <p v-if="user.verified">認証済み</p>
          <p v-else>メール認証中。確認メールを{{user.email}}宛に送りました。</p>
          <!-- resend verfication email -->
          <div></div>
        </div>

        <div class="wrapper">
          <h5>サブスクリプション</h5>
          <p v-if="paidSubscriber">有料</p>
          <p v-else>無料</p>
          <subscription-button></subscription-button>
        </div>


        <div class="wrapper">
          <h5>外部サービスとの連携</h5>
          <p v-if="provider.google">Google連携済み</p>
          <p v-if="provider.password">メールアドレス・パスワード連携済み</p>
          <link-provider></link-provider>
        </div>

        <div class="wrapper">
          <h5>お支払い設定</h5>
          <customer-portal></customer-portal>
        </div>

        <div class="wrapper">
          <h5>アカウント</h5>
          <button class="border" @click="signout">
            サインアウト
          </button>
          <!-- delete account -->
          <div>
            <!-- make sure its not a paid customer -->
            <!-- warn user if is a paid customer -->
          </div>
        </div>
      
      </div>     

    </div>
    

  </div>

</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import SubscriptionButton from "@/components/ui/SubscriptionButton.vue"
import CustomerPortal from "@/components/ui/CustomerPortal.vue"
import ChangePassword from "@/components/ui/ChangePassword.vue"
import LinkProvider from "@/components/ui/LinkProvider.vue"

export default {
  components: {
    SubscriptionButton,
    CustomerPortal,
    ChangePassword,
    LinkProvider
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
    paidSubscriber() {
      return this.$store.getters['auth/paidSubscriber']
    },
    provider() {
      return this.$store.getters['auth/provider']
    },
    isLoadingAuth() {
      return this.$store.getters['auth/isLoadingAuth']
    }
  },
  methods: {
    signout() {
      let r = confirm("本当にログアウトしますか？")

      if(r) {
        firebase.auth().signOut()

        this.$store.commit('auth/resetUser')
        this.$router.push('/')
      }

      return    
    }
  },
  watch: {
    // deactivate loading screen
    isLoadingAuth() {
      this.$store.commit('ui/stopLoading')
    }
  },
  mounted() {
    // activate loading screen
    if(this.isLoadingAuth) {
      this.$store.commit('ui/startLoading')
    }
  }
}
</script>

<style scoped lang="postcss">

.wrapper {
  @apply mb-1;
}

h5 {
  @apply font-bold mr-5 text-xl;
}

p {
  @apply text-black;
}
</style>