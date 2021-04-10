import { createStore } from "vuex"
import articlesModule from "./modules/articles/index"
import authModule from "./modules/auth/index"
import postsModule from "./modules/posts/index"

const store = createStore({
  modules: {
    articles: articlesModule,
    auth: authModule,
    posts: postsModule
  }
})

export default store