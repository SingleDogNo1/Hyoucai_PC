import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/layout.vue'
import Announcement from '@/views/common/announcement/index.vue'

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
    }
  ]
})
