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
    async loadData(context) {
      try {

        context.commit('ui/startLoading', null, {root: true})

        /**
         * load auth data
         */
        await context.dispatch('auth/initAuth', null, {root: true})

        /**
         * load post data
         */
        await context.dispatch('posts/loadPosts', null, {root: true})

        context.commit('isCompleted')

        context.commit('ui/stopLoading', null, {root: true})

      } catch(err) {
        console.log(err)
        context.commit('ui/stopLoading', null, {root: true})
      }
    }
  }
}