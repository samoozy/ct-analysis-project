import { createStore } from "vuex"
import authModule from "./modules/auth/index"
import postsModule from "./modules/posts/index"
import modalModule from "./modules/modal/index"

const store = createStore({
  modules: {
    auth: authModule,
    posts: postsModule,
    modal: modalModule
  }
})

export default store