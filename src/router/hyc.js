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
      path: '/register',
      component: Layout,
      redirect: '/register/mobile',
      children: [
        {
          path: 'mobile',
          name: 'registerMobile',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/register/mobile.vue')
        },
        {
          path: 'form',
          name: 'registerForm',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/register/form.vue')
        }
      ]
    },
    {
      path: '/login',
      component: Layout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/login/login.vue')
        }
      ]
    },
    {
      path: '/forgetPWD',
      component: Layout,
      children: [
        {
          path: '',
          name: 'forgetPWD',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/login/forgetPassword.vue')
        }
      ]
    }
  ]
})
