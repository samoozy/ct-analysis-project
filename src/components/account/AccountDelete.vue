<template>
  <div class="mt-8">

    <back-button @emitClick="$router.push('/account')">
      戻る
    </back-button>


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
        <base-button mode="ghost-red">アカウントを完全に削除して退会する</base-button>
      </form>
      
    </div>
    
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton'
import BackButton from '@/components/ui/BackButton'

export default {
  components: {
    BaseButton,
    BackButton,
  },
  data() {
    return {
      password: '',
    }
  },
  computed: {
    modalHook() {
      return this.$store.getters['modal/modalHook']
    }
  },
  watch: {
    modalHook() {
      if(this.modalHook === 'delete-reauthenticated') {
        console.log('delete user')
        this.$store.commit('modal/resetModalHook')
      }
    }
  },
  methods: {
    async submitDeleteAccountForm() {
      
      this.$store.commit('modal/openModal', 'reauthenticate')
      this.$store.commit('modal/setModalHook', 'delete')


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