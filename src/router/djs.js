import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/layout.vue'
import Mine from '@/layout/userIndex.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Layout
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'borrow',
          name: 'borrow',
          component: () => import('@/views/common/Borrow/Borrow')
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'mine',
          component: Mine,
          children: [
            {
              path: 'overview',
              name: 'overview',
              component: () => import('@/views/djs/Mine/overview')
            },
            {
              path: 'basicInfo',
              name: 'basicInfo',
              component: () => import('@/views/djs/Mine/basicInfo')
            },
            {
              path: 'bankcard',
              name: 'bankcard',
              component: () => import('@/views/djs/Mine/bankcard')
            },
            {
              path: 'referralCode',
              name: 'referralCode',
              component: () => import('@/views/djs/Mine/referralCode')
            }
          ]
        }
      ]
    }
  ]
})
