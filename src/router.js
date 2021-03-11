import { createRouter, createWebHistory } from 'vue-router'

import ArticlesList from './pages/articles/ArticlesList.vue'
import ArticleDetail from './pages/articles/ArticleDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/articles'
    },
    {
      path: '/articles',
      component: ArticlesList
    },
    {
      path: '/articles/:id',
      component: ArticleDetail
    }
  ]
})

export default router