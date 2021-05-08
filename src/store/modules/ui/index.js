export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      loadingAuth: false,
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    loadingAuth(state) {
      return state.loadingAuth
    },
  },
  mutations: {
    startLoading(state) {
      state.loading = true
    },
    stopLoading(state) {
      state.loading = false
    },
    startLoadingAuth(state) {
      state.loadingAuth = true
    },
    stopLoadingAuth(state) {
      state.loadingAuth = false
    },
  },
}