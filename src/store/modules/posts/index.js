import environments from "@/environments/environments"

export default {
  namespaced: true,
  state() {
    return {
      posts: []
    }
  },
  getters: {
    posts(state) {
      return state.posts
    },
    getInitialPosts(state) {
      return state.posts.slice(0, 6)
    },
    getPostById: state => reportId => state.posts.find(post => post.reportId === reportId)
  },
  actions: {
    async loadPosts(context) {
      try {

        const response = await fetch(`${environments.strapi.url}/posts?_sort=post_date:DESC`, {
          method: 'GET',
        })
        
        const data = await response.json()

        context.commit('setPosts', data)

      } catch(err) {
        console.log(err)
      }
    },
  },
  mutations: {
    setPosts(state, payload) {
      let posts = []

      payload.forEach(post => {
        let d = {}

        // Clean data
        d.title = post.title
        d.id = post.id
        d.reportId = post.report_name
        d.content = post.content.replace(/\n/g, '')
        d.date = post.post_date.replace(/-/g, '/')
        d.imgUrl = post.featured_image_url
        d.type = post.paid ? "有料" : "無料"

        posts.push(d)
      })

      state.posts = posts
    }
  }
}