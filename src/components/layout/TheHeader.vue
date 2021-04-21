<template>

  <div class="px-10">

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
          <navbar-button 
            mode="primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current mr-2" width="16" height="16" viewBox="0 0 24 24"><path d="M4 4v20h20v-20h-20zm18 18h-16v-13h16v13zm-3-3h-10v-1h10v1zm0-3h-10v-1h10v1zm0-3h-10v-1h10v1zm2-11h-19v19h-2v-21h21v2z"/></svg>
            レポート一覧
          </navbar-button>
        </li>
        <li class="ml-4">
          <navbar-button
            mode="secondary"
          >
            アカウント情報
          </navbar-button>
        </li>
        <li class="ml-4">
          <navbar-button
            mode="secondary"
          >
            ログイン
          </navbar-button>
        </li>
        <li class="ml-4">
          <navbar-button
            mode="primary"
          >
            新規登録
          </navbar-button>
        </li>
      </ul>

    </nav>
  </div>


  <!-- login modal -->
  <div class="container">
    <div v-if="showLogin">
      <user-auth mode="login"></user-auth>
    </div>
    <div v-else-if="showRegister">
      <user-auth mode="register"></user-auth>
    </div>
  </div>

  <!-- <div class="container">
    <button @click="sendEmail">SEND EMAIL</button>
  </div> -->

</template>

<script>
import UserAuth from "@/auth/UserAuth.vue"
import firebase from "firebase/app"
import "firebase/auth"

import NavbarButton from "@/components/ui/NavbarButton"
import MobileNavmenu from "@/components/layout/MobileNavmenu"

export default {
  components: {
    UserAuth,
    NavbarButton,
    MobileNavmenu
  },
  data() {
    return {
      showLogin: false,
      showRegister: false,
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
    }
  },
  methods: {
    toggleModal(modal) {
      if(modal === "login") {
        this.showLogin = !this.showLogin
      } else if(modal === "register") {
        this.showRegister = !this.showRegister
      }

    },
    async sendEmail() {
      const actionCodeSettings = {
        url: "http://localhost:8080/"
      }

      const user = firebase.auth().currentUser
      
      const res = await user.sendEmailVerification(actionCodeSettings)
      
      console.log(res)
    }
  }
}
</script>
