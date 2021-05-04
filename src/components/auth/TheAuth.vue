<template>

  <h3 class="mb-4 text-center text-lg">{{ title }}</h3>

  <div v-if="show === 'auth'">
    <AuthGoogle :buttonText="authGoogleText" />
    <base-button class="w-full mt-3" mode="filled-lg" @emitClick="setShow('auth-email')">
      <span class="w-full">{{ authEmailText }}</span>
    </base-button>
  </div>

  <!-- Email Authentication -->
  <div v-if="show === 'auth-email'">
    <back-button @emitClick="setShow('auth')">
      戻る
    </back-button>
    <AuthEmail :mode="mode" @authConfirm="setAuthConfirm" />
    <!-- redirect to password reset form -->
    <button 
      v-if="mode === 'login'"
      class="block focus:outline-none text-xs mt-2"
      @click="setAuthPasswordReset"
    >
      パスワードを忘れた方はこちらへ
    </button>
  </div>

  <!-- Password Reset -->
  <div v-if="show === 'auth-password-reset'">
    <back-button @emitClick="setAuthEmail">
      戻る
    </back-button>
    <AuthPasswordReset />
  </div>

  <!-- register confirmation -->
  <div v-if="show === 'auth-confirm'">
    <AuthConfirm />
  </div>

</template>

<script>
import BaseButton from "@/components/ui/BaseButton"
import BackButton from "@/components/ui/BackButton"
import AuthConfirm from "@/components/auth/AuthConfirm"
import AuthEmail from "@/components/auth/AuthEmail"
import AuthGoogle from "@/components/auth/AuthGoogle"
import AuthPasswordReset from "@/components/auth/AuthPasswordReset"

export default {
  components: {
    BaseButton,
    BackButton,
    AuthConfirm,
    AuthEmail,
    AuthGoogle,
    AuthPasswordReset,
  },
  props: {
    mode: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      title: '',
      googleAuthText: '',
      authEmailText: '',
      show: '',
      deactivated: false,
    }
  },
  methods: {
    setShow(value) {
      this.show = value
    },
    setInitialAuth() {
      switch(this.mode) {
        case 'login':
          this.title = "ログイン"
          this.authGoogleText = "Google"
          this.authEmailText = "メールアドレス"
          break
        case 'register':
          this.title = "ユーザー登録"
          this.authGoogleText = "Googleで登録"
          this.authEmailText = "メールアドレスで登録"
          break
        default:
          break
      }
    },
    setAuthEmail() {
      this.title = "ログイン"
      this.setShow('auth-email')
    },
    setAuthPasswordReset() {
      this.title = "パスワードリセット"
      this.setShow('auth-password-reset')
    },
    setAuthConfirm() {
      this.title = ""
      this.setShow('auth-confirm')
    },
  },
  mounted() {
    this.show = 'auth'
    this.deactivated = false
    this.setInitialAuth()
  },
}
</script>
