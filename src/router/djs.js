import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/layout.vue'
import Mine from '@/views/djs/Mine/Mine.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Layout
    },
    {
      path: '/borrow',
      component: Layout,
      children: [
        {
          path: '',
          name: 'borrow',
          component: () => import('@/views/common/Borrow/Borrow')
        }
      ]
    },
    {
      path: '/mine',
      component: Layout,
      children: [
        {
          path: '',
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
