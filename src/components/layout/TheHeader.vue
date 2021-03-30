<template>

  <div class="navbar">
    <h2>CT ANALYSIS</h2>

    <div class="flex">
      <router-link class="nav-link" to="/">コンテンツ一覧</router-link>
      <router-link class="nav-link" to="/login">ログイン</router-link>
      <img class="profile-pic" :src="user.userPhotoURL" alt="">
    </div>

  </div>

  
  <div class="container">
    <subscription-button></subscription-button>
  </div>
  <p>グーグル認証をしたユーザーのみ</p>
  
  <div class="container">
    <customer-portal></customer-portal>
  </div>
  
</template>

<script>
import SubscriptionButton from "@/components/ui/SubscriptionButton.vue"
import CustomerPortal from "@/components/ui/CustomerPortal.vue"

export default {
  components: {
    SubscriptionButton,
    CustomerPortal
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
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
}

.nav-link:hover {
  opacity: 0.6;
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