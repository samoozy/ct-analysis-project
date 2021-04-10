import { createRouter, createWebHistory } from 'vue-router'

import ArticlesList from './pages/articles/ArticlesList.vue'
import ArticleDetail from './pages/articles/ArticleDetail.vue'
import ReportsList from './pages/reports/ReportsList.vue'
import ReportDetail from './pages/reports/ReportDetail.vue'
import Login from './pages/login/Login.vue'
import StripeCheckout from './pages/stripe-checkout/StripeCheckout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/reports'
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
          b: route.query.test
        }
      )
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsList
    },
    {
      path: '/reports/:reportId',
      component: ReportDetail,
      props: route => (
        {
          postId: route.params.reportId
        }
      )
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/stripe-checkout',
      component: StripeCheckout
    }
  ]
})

export default router