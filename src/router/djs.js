import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/layout.vue'

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
      name: 'borrow',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/common/Borrow/Borrow')
        }
      ]
    },
    {
      path: '/',
      name: 'index',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/djs/Index/Index')
        }
      ]
    }
  ]
})
