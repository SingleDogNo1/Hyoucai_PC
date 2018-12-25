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
          path: '/caculator',
          name: 'caculator',
          component: () => import(/* webpackChunkName: "common" */ '@/views/common/caculator/caculator.vue')
        }
      ]
    }
  ]
})
