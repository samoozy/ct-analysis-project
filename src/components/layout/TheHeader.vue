<template>

  <div class="px-10 py-2 mb-3 shadow">

    <!-- navbar -->
    <nav class="flex justify-center lg:justify-between items-center">

      <router-link to="/">
        <div class="h-9 sm:h-14 w-auto">
          <img class="h-full w-auto" src="@/assets/navbar-logo.png" alt="">
        </div>
      </router-link>

      <MobileNavmenu />

      <ul 
        class="lg:flex lg:static hidden"
      >

        <li class="ml-4">
          <link-button
            mode="filled"
            dest="/reports"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current mr-2" width="16" height="16" viewBox="0 0 24 24"><path d="M4 4v20h20v-20h-20zm18 18h-16v-13h16v13zm-3-3h-10v-1h10v1zm0-3h-10v-1h10v1zm0-3h-10v-1h10v1zm2-11h-19v19h-2v-21h21v2z"/></svg>
            レポート一覧
            
          </link-button>
        </li>
        <li v-if="loggedIn" class="ml-4">
          <link-button
            mode="ghost"
            dest="/account"
          >
            アカウント情報
          </link-button>
        </li>
        <li v-if="!loggedIn" class="ml-4">
          <base-button
            mode="ghost"
            @emitClick="openAuthModal('login')"
          >
            ログイン
          </base-button>
        </li>
        <li v-if="!loggedIn" class="ml-4">
          <base-button
            mode="filled"
            @emitClick="openAuthModal('register')"
          >
            新規登録
          </base-button>
        </li>
      </ul>

    </nav>
  </div>

  <the-modal
    @onClick="closeAuthModal"
  >
    <TheAuth
      :mode="mode"
     />
  </the-modal>

</template>

<script>
import TheAuth from "@/components/auth/TheAuth"
import BaseButton from "@/components/ui/BaseButton"
import LinkButton from "@/components/ui/LinkButton"
import MobileNavmenu from "@/components/layout/MobileNavmenu"
import TheModal from "@/components/layout/TheModal"

export default {
  components: {
    BaseButton,
    LinkButton,
    MobileNavmenu,
    TheModal,
    TheAuth,
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    paidSubscriber() {
      return this.$store.getters['auth/paidSubscriber']
    },
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
    open() {
      return this.isOpen
    },
    mode() {
      return this.$store.getters['modal/mode']
    },
  },
  methods: {
    openAuthModal(mode) {
      this.$store.commit('modal/openModal', mode)
    },
    closeAuthModal() {
      this.$store.commit('modal/closeModal')
    },
  },
}
</script>
