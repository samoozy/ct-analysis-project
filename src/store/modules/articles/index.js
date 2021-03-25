import firestore from '@/firebase/firestore'

export default {
  namespaced: true,
  state() {
    return {
      articles: []
    }
  },
  getters: {
    articles(state) {
      return state.articles
    }
  },
  actions: {
    // Loading articles
    async loadArticles(context) {

      let articles = []

      const articlesCollection = await firestore.collection('articles').get()

      articlesCollection.forEach(doc => {
        let article = doc.data()
        article['articleId'] = doc.id
        articles.push(article)
      })

      context.commit('setArticles', articles)
    },
  },
  mutations: {
    setArticles(state, payload) {
      // sort by id
      payload.sort((a, b) => a.id - b.id)
      state.articles = payload
    }
  }
}