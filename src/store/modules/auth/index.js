import firebase from "firebase/app"
import "firebase/auth"

export default {
  namespaced: true,
  state() {
    return {
      loggedIn: false,
      user: {}
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    resetUser(state) {
      state.user = {}
    }
  },
  actions: {
    initAuth(context) {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          
          context.commit('setUser', {
            userId: user.uid,
            userPhotoURL: user.photoURL
          })

        } else {
          console.log("not logged in")
        }
      })
    }
  }
}