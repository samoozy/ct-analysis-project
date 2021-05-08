import firestore from '@/firebase/firestore'
import environments from '@/environments/environments'

export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      user: {},
      provider: {
        password: false,
        google: false
      },
      paidSubscriber: false,
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    userVerified(state) {
      return state.user.verified
    },
    userEmail(state) {
      return state.user.email
    },
    loggedIn(state) {
      return state.loggedIn
    },
    paidSubscriber(state) {
      return state.paidSubscriber
    },
    provider(state) {
      return state.provider
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoggedIn(state) {
      state.loggedIn = true
    },
    setPaidSubscriber(state) {
      state.paidSubscriber = true
    },
    setProvider(state, payload) {  
      // Find all the provider the user have linked to their account 
      payload.forEach(provider => {
        if(provider === "google.com") {
          // set true if google is linked
          state.provider.google = true
        } else if(provider === "password") {
          //set true if email and password is linked
          state.provider.password = true
        }
      })
    },
    resetUser(state) {
      state.loggedIn = false
      state.user = {}
      state.provider = {
        password: false,
        google: false
      }
      state.paidSubscriber = false
    },
  },
  actions: {
    async setUserAuth(context, payload) {
      // set logged in state
      context.commit('setLoggedIn')

      // set user state
      context.commit('setUser', {
        userId: payload.uid,
        userPhotoURL: payload.photoURL,
        displayName: payload.displayName,
        email: payload.email, 
        verified: payload.emailVerified
      })

      // set provider state
      let provider = []
      payload.providerData.forEach(profile => {
        provider.push(profile.providerId)
      })
      context.commit('setProvider', provider)

      // set paid subscriber state
      const doc = await firestore.collection('users').doc(payload.uid).get()
      const pid = doc.get('pricingPlanId')
      if(pid === environments.stripe.pricingPlanId) {
        context.commit('setPaidSubscriber')
      }

    },
  }
}