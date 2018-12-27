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
          path: '/caculator', // 收益计算器
          name: 'caculator',
          component: () => import(/* webpackChunkName: "caculator" */ '@/views/djs/caculator/caculator.vue')
        },
        {
          path: '/lend', // 我要出借
          name: 'lend',
          component: () => import(/* webpackChunkName: "lend" */ '@/views/djs/lend/lend.vue')
        },
        {
          path: '/record', // 交易记录
          name: 'record',
          component: () => import(/* webpackChunkName: "record" */ '@/views/djs/record/record.vue')
        }
      ]
    }
  ]
})
