import { createStore } from "vuex"
import authModule from "./modules/auth/index"
import postsModule from "./modules/posts/index"
import modalModule from "./modules/modal/index"
import uiModule from "./modules/ui/index"

const store = createStore({
  modules: {
    auth: authModule,
    posts: postsModule,
    modal: modalModule,
    ui: uiModule
  }
})

export default store