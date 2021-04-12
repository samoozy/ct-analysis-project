<template>
  <div v-if="!loggedIn">
      ログインしてください。
    <router-link to="/login">ログイン</router-link>
  </div>

  <div v-else>
    <div>
      <h1 class="text-center">アカウント情報</h1>

      <div class="container">
        {{ user }}
      </div>

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

export default {
  components: {
    SubscriptionButton,
    CustomerPortal
  },
  methods: {
    signout() {
      let r = confirm("本当にログアウトしますか？")

      if(r) {
        console.log('signing out')
        firebase.auth().signOut()

        this.$store.commit('auth/resetUser')
        this.$router.push('/')
      }

      return    
    }
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
  justify-content: center;
  padding-top: 2rem;
}

.text-center {
  text-align: center;
}
</style>