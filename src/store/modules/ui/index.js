export default {
  namespaced: true,
  state() {
    return {
      loading: false
    }
  },
  getters: {
    loading(state) {
      return state.loading
    }
  },
  mutations: {
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    },
  },
}