import { createStore } from "vuex"
import articlesModule from "./modules/articles/index"
import authModule from "./modules/auth/index"

const store = createStore({
  modules: {
    articles: articlesModule,
    auth: authModule
  }
})

export default store