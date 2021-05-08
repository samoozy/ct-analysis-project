import firebase from "firebase/app"
import "firebase/auth"

export default {
  namespaced: true,
  state() {
    return {
      /**
       * This is needed for the ReportDetail component to load its id specific report on a page refresh
       */
      completed: false
    }
  },
  getters: {
    completed(state) {
      return state.completed
    }
  },
  mutations: {
    isCompleted(state) {
      state.completed = true
    }
  },
  actions: {
    /**
     * 
     * Experimental state loader
     * 
     */
    loadAuthAndData(context) {
      // start spinner when the root App is first loaded
      context.commit('ui/startLoading', null, {root: true})


      firebase.auth().onAuthStateChanged(async user => {

        // check if the user object exists
        if(user) {

          // This loading screen is necessary for user login and user register
          context.commit('ui/startLoading', null, {root: true})

          await context.dispatch('auth/setUserAuth', user, {root: true})
          console.log('done loading auth...')

        }

        /**
         * load post data
         * 
         * Since Vue returns a Proxy object instead of an array, we have to check the length of the returned object. 
         */
        if(!context.rootGetters['posts/posts'].length) {
          await context.dispatch('posts/loadPosts', null, {root: true})

          // This is for triggering the watcher in ReportDetail component
          context.commit('isCompleted')
        }

        // stop spinner
        context.commit('ui/stopLoading', null, {root: true})

        // unsubscribe from onauthstatechanged
        // If this is enabled, the state change will not occur when user logs in or registers
        // unsubscribe()
      })
      // end of firebase onauthstatechanged
    }
  }
}