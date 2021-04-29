<template>
  <!-- メールアドレス -->
  <content-block>
    <template v-slot:title>
      メールアドレス・パスワード
    </template>
    <template v-slot:text>
      <div v-if="user.email">
        <p>{{ user.email }}</p>
        <p>********</p>
      </div>
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
      <ResendVerification v-if="!user.verified" />
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
      <router-link 
        v-if="!paidSubscriber" 
        class="text-sm text-indigo-600"
        to="/promotion">有料プラン詳細</router-link>
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
      <LinkProvider v-if="!provider.google" />
    </template>
  </content-block>

  <!-- サインアウトと退会手続き -->
  <content-block>
    <template v-slot:btn>
      <base-button mode="ghost" @emitClick="signout">
        サインアウト
      </base-button>
      <!-- delete account -->
      <div>
        <!-- make sure its not a paid customer -->
        <!-- warn user if is a paid customer -->
      </div>
    </template>
  </content-block>

  <content-block>
    <template v-slot:btn>
      <router-link class="text-gray-600 text-sm" to="/">退会手続きへ</router-link>
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
import ChangePassword from "@/components/account/ChangePassword.vue"
import ResendVerification from "@/components/account/ResendVerification"
import LinkProvider from "@/components/account/LinkProvider.vue"
import ContentBlock from "@/components/account/ContentBlock"
import BaseButton from "@/components/ui/BaseButton"

export default {
  components: {
    ChangePassword,
    ResendVerification,
    LinkProvider,
    ContentBlock,
    BaseButton
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
      let r = confirm("本当にサインアウトしますか？")
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