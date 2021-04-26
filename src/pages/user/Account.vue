<template>
  <div v-if="!loggedIn">
      ログインしてください。
  </div>

  <div v-else>
    <div>
      <h1 class="text-center">アカウント情報</h1>

      <div class="container">
        <div>メールアドレス：{{ user.email }}</div>
        <div>
          認証：
          <span v-if="user.verified">メール認証済み</span>
          <span v-else>メール認証中。確認メールを{{user.email}}宛に送りました。</span>
        </div>
        <div>
          サブスクリプション：<span v-if="paidSubscriber">有料</span><span v-else>無料</span>
        </div>
        <div>
          連携済みサービス：
          <div v-if="provider.google">Google</div>
          <div v-if="provider.password">メールアドレス・パスワード</div>
        </div>
      </div>

      <!-- change password and/or set password -->
      <change-password :provider="provider"></change-password>

      <!-- link to google -->
      <div class="container" v-if="!provider.google">
        <link-provider></link-provider>
      </div>


      <!-- delete account -->
      <div>
        <!-- make sure its not a paid customer -->
        <!-- warn user if is a paid customer -->
      </div>

      <!-- show customer portal or subscription -->
      <div v-if="paidSubscriber" class="container">
        <customer-portal></customer-portal>
      </div>
      <div v-else class="container">
        <subscription-button></subscription-button>
      </div>


      <div class="container">
        <button class="btn" @click="signout">
          サインアウト
        </button>
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
}
</script>

<style scoped>
h1 {
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

.btn:hover {
  opacity: 0.8;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
}

.text-center {
  text-align: center;
}
</style>