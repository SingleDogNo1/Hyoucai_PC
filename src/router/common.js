import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Layout,
      children: [
        {
          path: '/register/mobile',
          name: 'mobile',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/register/mobile.vue')
        },
        {
          path: '/caculator',
          name: 'caculator',
          component: () => import(/* webpackChunkName: "caculator" */ '@/views/common/caculator/caculator.vue')
        }
      ]
    }
  ]
})
