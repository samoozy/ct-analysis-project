import { createStore } from "vuex"
import authModule from "./modules/auth/index"
import postsModule from "./modules/posts/index"

const store = createStore({
  modules: {
    auth: authModule,
    posts: postsModule
  }
})

export default store