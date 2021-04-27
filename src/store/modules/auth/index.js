import firebase from "firebase/app"
import "firebase/auth"
import firestore from '@/firebase/firestore'

export default {
  namespaced: true,
  state() {
    return {
      isLoadingAuth: false,
      loggedIn: false,
      paidSubscriber: false,
      user: {},
      provider: {
        password: false,
        google: false
      }
    }
  },
  getters: {
    isLoadingAuth(state) {
      return state.isLoadingAuth
    },
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
    startLoadingAuth(state) {
      state.isLoadingAuth = true
    },
    stopLoadingAuth(state) {
      state.isLoadingAuth = false
    },
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
      // Find all the provider the user have linked their account 
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
      state.user = {}
      state.loggedIn = false
      state.paidSubscriber = false
      state.provider = {
        password: false,
        google: false
      }
    },
  },
  actions: {
    async initAuth(context) {
      // start loading
      context.commit('startLoadingAuth')

      firebase.auth().onAuthStateChanged(async user => {
        if(user) {

          // set user
          context.commit('setUser', {
            userId: user.uid,
            userPhotoURL: user.photoURL,
            displayName: user.displayName,
            email: user.email, 
            verified: user.emailVerified
          })
          context.commit('setLoggedIn')

          // set provider
          let provider = []
          user.providerData.forEach(profile => {
            provider.push(profile.providerId)
          })
          context.commit('setProvider', provider)
          
          // check if the user is a subscriber
          const doc = await firestore.collection('users').doc(user.uid).get()

          if(doc.data()) {
            context.commit('setPaidSubscriber')
          }

          // stop loading
          context.commit('stopLoadingAuth')
          
        } else {
          console.log("not logged in")

          // stop loading
          context.commit('stopLoadingAuth')
        }
      })
    },
  }
}