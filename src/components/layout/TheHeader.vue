<template>

  <div class="px-10 py-1 mb-3 shadow">

    <!-- navbar -->
    <nav class="flex justify-center lg:justify-between items-center">

      <router-link to="/">
        <div class="h-9 sm:h-14 w-auto">
          <img class="h-full w-auto" src="@/assets/navbar-logo.png" alt="">
        </div>
      </router-link>

      <MobileNavmenu 
        @redirectToAccount="redirectToPath('/account')"
      />

      <ul 
        class="lg:flex lg:static hidden"
      >
        <li class="ml-4">
          <navbar-button 
            mode="filled"
            @emitClick="redirectToPath('/')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current mr-2" width="16" height="16" viewBox="0 0 24 24"><path d="M4 4v20h20v-20h-20zm18 18h-16v-13h16v13zm-3-3h-10v-1h10v1zm0-3h-10v-1h10v1zm0-3h-10v-1h10v1zm2-11h-19v19h-2v-21h21v2z"/></svg>
            レポート一覧
          </navbar-button>
        </li>
        <li class="ml-4">
          <navbar-button
            mode="ghost"
            @emitClick="redirectToPath('/account')"
          >
            アカウント情報
          </navbar-button>
        </li>
        <li class="ml-4">
          <navbar-button
            mode="ghost"
            @emitClick="openAuthModal('login')"
          >
            ログイン
          </navbar-button>
        </li>
        <li class="ml-4">
          <navbar-button
            mode="filled"
            @emitClick="openAuthModal('register')"
          >
            新規登録
          </navbar-button>
        </li>
      </ul>

    </nav>
  </div>

  <the-modal
    @onClick="closeAuthModal"
  >
    <UserAuth
      :mode="mode"
     />
  </the-modal>

  

</template>

<script>
import UserAuth from "@/auth/UserAuth"
import NavbarButton from "@/components/ui/NavbarButton"
import MobileNavmenu from "@/components/layout/MobileNavmenu"
import TheModal from "@/components/layout/TheModal"

export default {
  components: {
    NavbarButton,
    MobileNavmenu,
    TheModal,
    UserAuth
  },
  data() {
    return {
      mode: ''
    }
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
  },
  methods: {
    redirectToPath(path) {
      this.$router.push(path)
    },
    openAuthModal(mode) {
      this.mode = mode
      this.$store.commit('modal/openModal')
    },
    closeAuthModal() {
      this.$store.commit('modal/closeModal')
    },
  }
}
</script>
