import firebase from "firebase/app"
import "firebase/auth"
import firestore from '@/firebase/firestore'

export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      paidSubscriber: false,
      user: {}
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    loggedIn(state) {
      return state.loggedIn
    },
    paidSubscriber(state) {
      return state.paidSubscriber
    }
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
    resetUser(state) {
      state.user = {}
      state.loggedIn = false
      state.paidSubscriber = false
    }
  },
  actions: {
    initAuth(context) {

      firebase.auth().onAuthStateChanged(user => {
        if(user) {

          context.commit('setUser', {
            userId: user.uid,
            userPhotoURL: user.photoURL,
            displayName: user.displayName,
            email: user.email
          })
          context.commit('setLoggedIn')

          // check if the user is a subscriber
          firestore.collection('users').doc(user.uid).get().then(doc => {
            // if the pricingPlanId exists for this user, that means the user is a paid subscriber
            if(doc.data()) {
              context.commit('setPaidSubscriber')
            }
            
          })
          
        } else {
          console.log("not logged in")
        }
      })
    }
  }
}