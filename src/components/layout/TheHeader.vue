<template>

  <div class="navbar">
    <h2>CT ANALYSIS</h2>

    <div class="flex">

      <router-link class="nav-link" to="/reports">レポート一覧</router-link>

      <!-- not logged in -->
      <div
        v-if="!loggedIn"
        class="flex"
      >
        <!-- <router-link 
          class="nav-link" 
          to="/login"
        >ログイン</router-link>

        <router-link
          class="nav-link"
          to="/login"
        >
          新規登録
        </router-link> -->

        <button 
          class="nav-link" 
          @click="toggleModal('login')"
          :disabled="showRegister"
        >
          ログイン
        </button>

        <button 
          class="nav-link" 
          @click="toggleModal('register')"
          :disabled="showLogin"
        >
          新規登録
        </button>

      </div>

      <!-- logged in -->
      <div 
        v-else
        class="flex"
      >
        <router-link 
          class="nav-link" 
          to="/account"
        >アカウント情報</router-link>
        <img 
          class="profile-pic" 
          :src="user.userPhotoURL" 
          alt=""
        >
      </div>

    </div> 
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

export default {
  components: {
    UserAuth
  },
  data() {
    return {
      showLogin: false,
      showRegister: false
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

<style scoped>
.navbar {
  display: flex;
  box-shadow: 0px 3px 5px#D3D3D3;
  height: 70px;
  padding: 0 3rem;
  align-items: center;
  justify-content: space-between;
}

h2 {
  color: steelblue;
}

.profile-pic {
  height: 100%;
  width: auto;
  padding: 1rem;
}

.flex {
  display: flex;
  height: 100%;
  align-items: center;
}

.nav-link {
  display: block;
  padding: 7px 12px;
  cursor: pointer;
  border: 1px solid steelblue;
  color: steelblue;
  border-radius: 4px;
  text-decoration: none;
  margin: 0 0.5rem;
  font-size: 0.9rem;
  background-color: #fff;
  outline: none;
}

.nav-link:hover {
  opacity: 0.6;
}

.nav-link:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.container {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}

p {
  margin: 0;
  text-align: center;
}

</style>