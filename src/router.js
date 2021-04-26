import { createRouter, createWebHistory } from 'vue-router'

import ReportsList from './pages/reports/ReportsList.vue'
import ReportDetail from './pages/reports/ReportDetail.vue'
import Account from './pages/user/Account.vue'
import StripeCheckout from './pages/stripe-checkout/StripeCheckout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/reports'
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
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/stripe-checkout',
      component: StripeCheckout
    }
  ]
})

export default router