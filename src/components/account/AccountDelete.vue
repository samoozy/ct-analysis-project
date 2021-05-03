<template>
  <div class="mt-8">
    <router-link to="/account" class="flex items-center w-max">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
      <span class="pl-2">戻る</span>
    </router-link>

    <h1 class="text-xl mt-4 font-bold">アカウント削除と退会</h1>
    <p>アカウントを削除すると関連するデータ(Stripe決済など)は全て削除され、サービスをご利用できなくなります。</p>
    <p>CT ANALYSISのアカウントを完全に削除して退会しますか？</p>


    <div class="my-6">
      <h3 class="text-red-600 text-sm">【注意】退会手続きについての注意点</h3>
      <div class="text-sm">
        <p>請求明細書をご希望の場合にはアカウント情報のお支払い設定にアクセスの上、お客さまご自身でご確認、印刷をお願いします。</p>
        <p>なお、弊社では退会証明書の発行は行っておりませんので、退会証明書が必要な場合には請求明細書での代用をお願いしております。</p>
      </div>
    </div>

    <div class="mb-8">

      <form @submit.prevent="submitDeleteAccountForm">
        <div class="mb-2">
          <input class="border rounded p-2 focus:outline-none" type="password" v-model="password" placeholder="パスワード">
        </div>
        <base-button mode="ghost-red">アカウントを完全に削除して退会する</base-button>
      </form>
      
    </div>
    
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'

import FirebaseAuth from '@/services/firebase-auth'

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      password: '',
    }
  },
  methods: {
    async submitDeleteAccountForm() {

      const firebaseAuth = new FirebaseAuth()
      firebaseAuth.setUser = firebase.auth()
      console.log(firebaseAuth.current.currentUser)



      // const user = firebase.auth().currentUser
      // const credential = firebase.auth.EmailAuthProvider.credential(
      //   user.email,
      //   this.password
      // )

      // try {
      //   const res = await user.reauthenticateWithCredential(credential)
      //   console.log(await res.user.getIdToken())
      // } catch(err) {
      //   console.log('failed to authenticate')
      // }

    
      /**
       * Google Authentication
       */
      // const provider = new firebase.auth.GoogleAuthProvider()
      // user.reauthenticateWithPopup(provider)
    }
  },
}
</script>