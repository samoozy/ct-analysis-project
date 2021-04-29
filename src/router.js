import { createRouter, createWebHistory } from 'vue-router'

import ReportsList from './pages/reports/ReportsList.vue'
import ReportDetail from './pages/reports/ReportDetail.vue'
import UserAccount from './pages/user/UserAccount.vue'
import StripeCheckout from './pages/stripe-checkout/StripeCheckout.vue'
import ThePromotion from './pages/promotion/ThePromotion.vue'

import AccountSettings from './components/account/AccountSettings.vue'
import AccountPayment from './components/account/AccountPayment.vue'

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
      component: UserAccount,
      children: [
        {
          path: '',
          redirect: '/account/settings'
        },
        {
          path: 'settings',
          component: AccountSettings
        },
        {
          path: 'payment',
          component: AccountPayment
        },
      ]
    },
    {
      path: '/stripe-checkout',
      component: StripeCheckout
    },
    {
      path: '/promotion',
      component: ThePromotion
    }
  ]
})

export default router