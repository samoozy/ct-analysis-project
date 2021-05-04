import firebase from "firebase/app"
import "firebase/auth"
import firestore from '@/firebase/firestore'
import environments from '@/environments/environments'

export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      user: null,
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
      state.user = null
      state.provider = {
        password: false,
        google: false
      }
      state.paidSubscriber = false
    },
  },
  actions: {
    async initAuth(context) {

      try {
        
        firebase.auth().onAuthStateChanged(async user => {
          if(user) {

            // set logged in state
            context.commit('setLoggedIn')
  
            // set user state
            context.commit('setUser', {
              userId: user.uid,
              userPhotoURL: user.photoURL,
              displayName: user.displayName,
              email: user.email, 
              verified: user.emailVerified
            })          
  
            // set provider state
            let provider = []
            user.providerData.forEach(profile => {
              provider.push(profile.providerId)
            })
            context.commit('setProvider', provider)
            
            // set paid subscriber state
            const doc = await firestore.collection('users').doc(user.uid).get()
            const pid = doc.get('pricingPlanId')
            if(pid === environments.stripe.pricingPlanId) {
              context.commit('setPaidSubscriber')
            }
            
          } else {
            console.log("not logged in")
          }
        })

      } catch(err) {
        console.log(err)
      }
    },
  }
}