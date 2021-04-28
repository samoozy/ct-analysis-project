<template>
  <!-- メールアドレス -->
  <content-block>
    <template v-slot:title>
      メールアドレス・パスワード
    </template>
    <template v-slot:text>
      <p>{{ user.email }}</p>
      <p>******</p>
    </template>
    <template v-slot:btn>
      <ChangePassword :provider="provider" />
    </template>
  </content-block>

  <!-- メールアドレス認証 -->
  <content-block>
    <template v-slot:title>
      メールアドレス認証
    </template>
    <template v-slot:text>
      <p v-if="user.verified">認証済み</p>
      <p v-else>メール認証中。確認メールを{{user.email}}宛に送りました。</p>
    </template>
    <!-- resend verfication email -->
    <template v-slot:btn>
      <button class="border">RESEND VERIFICATION</button>
    </template>
  </content-block>

  <!-- サブスクリプション -->
  <content-block>
    <template v-slot:title>
      サブスクリプション
    </template>
    <template v-slot:text>
      <p v-if="paidSubscriber">有料</p>
      <p v-else>無料</p>
    </template>
    <template v-slot:btn>
      <SubscriptionButton />
    </template>
  </content-block>

  <!-- 外部サービスとの連携 -->
  <content-block>
    <template v-slot:title>
      外部サービスとの連携
    </template>
    <template v-slot:text>
      <p v-if="provider.google">Google連携済み</p>
      <p v-if="provider.password">メールアドレス・パスワード連携済み</p>
    </template>
    <template v-slot:btn>
      <LinkProvider />
    </template>
  </content-block>

  <!-- サインアウトと退会手続き -->
  <content-block>
    <template v-slot:btn>
      <button class="border" @click="signout">
        サインアウト
      </button>
      <!-- delete account -->
      <div>
        <!-- make sure its not a paid customer -->
        <!-- warn user if is a paid customer -->
      </div>
    </template>
  </content-block>

</template>

<script>
/**
 * firebase
 */
import firebase from "firebase/app"
import "firebase/auth"
/**
 * components
 */
import ChangePassword from "@/components/ui/ChangePassword.vue"
import SubscriptionButton from "@/components/ui/SubscriptionButton.vue"
import LinkProvider from "@/components/ui/LinkProvider.vue"
import ContentBlock from "@/components/account/ContentBlock"


export default {
  components: {
    ChangePassword,
    SubscriptionButton,
    LinkProvider,
    ContentBlock
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    provider() {
      return this.$store.getters['auth/provider']
    },
    paidSubscriber() {
      return this.$store.getters['auth/paidSubscriber']
    },
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
  }
}
</script>