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
    getPostById: state => id => state.posts.find(post => post.id === id)
  },
  actions: {
    // Load WP posts using WPGraphQL
    async loadPosts(context) {

      try {
        // Since Vue returns a Proxy object instead of an array, we have to check the length of the returned object. 
        
        // This checks the length of the returned Proxy Object.
        // if(context.getters['posts'].length) {
        //   console.log('state exists')
        //   return
        // }

        // fetch posts from wpgraphql
        const response = await fetch(environments.wpgraphql.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `
              {
                posts(where: {orderby: {field: DATE, order: DESC}}) {
                  nodes {
                    title
                    id
                    date
                    slug
                    content
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                    categories {
                      nodes {
                        name
                      }
                    }
                  }
                }
              }
            `
          })
        })

        const res = await response.json()
        const posts = res.data.posts.nodes

        context.commit('setPosts', posts)
        
      } catch(error) {
        console.error()
      }
    }

  },
  mutations: {
    setPosts(state, payload) {
      let posts = []

      payload.forEach(post => {
        let d = {}

        // Clean data
        d.title = post.title
        d.id = post.id
        d.reportId = post.slug
        d.content = post.content.replace(/\n/g, '')
        d.date = post.date.split('T')[0].replace(/-/g, '/')
        d.imgUrl = post.featuredImage.node.mediaItemUrl
        d.type = post.categories.nodes[0].name

        posts.push(d)
      })

      state.posts = posts
    }
  }
}