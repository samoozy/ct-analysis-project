import { createRouter, createWebHistory } from 'vue-router'

import ArticlesList from './pages/articles/ArticlesList.vue'
import ArticleDetail from './pages/articles/ArticleDetail.vue'
import Login from './pages/login/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/articles'
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesList
    },
    {
      path: '/articles/:name',
      component: ArticleDetail,
      // Passing props to route components
      // Function mode
      props: route => (
        {
          query: route.query.id,
          id: route.params.name,
        }
      )
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router