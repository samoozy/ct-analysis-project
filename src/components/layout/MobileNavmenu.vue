<template>
  <div class="lg:hidden">

    <!-- hamburger menu -->
    <button 
      class="absolute top-4 left-7 focus:outline-none"
      @click="openMenu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-indigo-600" width="28" height="28" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
    </button>

    <!-- menu overlay -->
    <div 
      v-if="isActive"
      class="fixed top-0 left-0 w-full h-full bg-black opacity-50"
      @click="closeMenu"
    ></div>

    <!-- mobile navbar menu -->
    <div 
      class="fixed top-0 -left-48 w-48 h-full bg-white transition-transform duration-200 ease-out"
      :class="{ 
        'transform translate-x-48' : isActive
      }"
    >
      <ul class="flex flex-col items-center">
        <li>
          <base-button 
            mode="filled"
            @emitClick="redirectToPath('/')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current mr-2" width="16" height="16" viewBox="0 0 24 24"><path d="M4 4v20h20v-20h-20zm18 18h-16v-13h16v13zm-3-3h-10v-1h10v1zm0-3h-10v-1h10v1zm0-3h-10v-1h10v1zm2-11h-19v19h-2v-21h21v2z"/></svg>
            レポート一覧
          </base-button>
        </li>
        <li v-if="loggedIn">
          <base-button
            mode="ghost"
            @emitClick="redirectToPath('/account')"
          >
            アカウント情報
          </base-button>
        </li>
        <li v-if="!loggedIn">
          <base-button
            mode="ghost"
            @emitClick="openAuthModal('login')"
          >
            ログイン
          </base-button>
        </li>
        <li v-if="!loggedIn">
          <base-button
            mode="filled"
            @emitClick="openAuthModal('register')"
          >
            新規登録
          </base-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton"

export default {
  components: {
    BaseButton,
  },
  emits: [
    'redirectToAccount'
  ],
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
  },
  methods: {
    openMenu() {
      this.isActive = true
    },
    closeMenu() {
      this.isActive = false
    },
    redirectToPath(path) {
      this.$router.push(path)
      this.closeMenu()
    },
    openAuthModal(mode) {
      this.$store.commit('modal/openModal', mode)
    },
  }
}
</script>

<style scoped>
li {
  @apply mt-6;
}
</style>