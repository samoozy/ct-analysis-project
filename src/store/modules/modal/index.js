export default {
  namespaced: true,
  state() {
    return {
      isOpen: false,
      mode: ''
    }
  },
  getters: {
    isOpen(state) {
      return state.isOpen
    },
    mode(state) {
      return state.mode
    }
  },
  mutations: {
    closeModal(state) {
      state.isOpen = false
    },
    openModal(state, payload) {
      state.mode = payload
      state.isOpen = true
    },
  }
}