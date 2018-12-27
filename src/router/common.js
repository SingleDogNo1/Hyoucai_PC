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
          name: 'registerMobile',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/register/mobile.vue')
        },
        {
          path: '/register/form',
          name: 'registerForm',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/register/form.vue')
        }
      ]
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
    }
  ]
})
