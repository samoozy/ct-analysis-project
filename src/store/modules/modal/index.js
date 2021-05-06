export default {
  namespaced: true,
  state() {
    return {
      isOpen: false,
      mode: '',
      modalHook: '',
    }
  },
  getters: {
    isOpen(state) {
      return state.isOpen
    },
    mode(state) {
      return state.mode
    },
    modalHook(state) {
      return state.modalHook
    },
  },
  mutations: {
    closeModal(state) {
      state.isOpen = false
    },
    openModal(state, payload) {
      state.mode = payload
      state.isOpen = true
    },
    setModalHook(state, payload) {
      state.modalHook = payload
    },
    resetModalHook(state) {
      state.modalHook = ''
    },
  }
}