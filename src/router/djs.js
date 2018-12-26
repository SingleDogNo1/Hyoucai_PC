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
      component: Layout,
      children: [
        {
          path: '',
          name: 'borrow',
          component: () => import('@/views/common/Borrow/Borrow')
        }
      ]
    }
  ]
})
