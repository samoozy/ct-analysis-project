export default {
  namespaced: true,
  state() {
    return {
      isOpen: false
    }
  },
  getters: {
    isOpen(state) {
      return state.isOpen
    }
  },
  mutations: {
    closeModal(state) {
      state.isOpen = false
    },
    openModal(state) {
      state.isOpen = true
    }
  }
}