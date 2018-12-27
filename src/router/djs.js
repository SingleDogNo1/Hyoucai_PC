import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/layout.vue'
import Mine from '@/layout/userIndex.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/djs/Index/Index')
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
    },
    {
      path: '/', // 收益计算器
      component: Layout,
      children: [
        {
          path: 'caculator',
          name: 'caculator',
          component: () => import(/* webpackChunkName: "caculator" */ '@/views/djs/caculator/caculator.vue')
        }
      ]
    },
    {
      path: '/', // 我要出借
      component: Layout,
      children: [
        {
          path: 'lend',
          name: 'lend',
          component: () => import(/* webpackChunkName: "lend" */ '@/views/djs/lend/lend.vue')
        }
      ]
    },
    {
      path: '/mine',
      component: Layout,
      redirect: '/mine/overview',
      children: [
        {
          path: '',
          component: Mine,
          children: [
            {
              path: 'overview', // 账户总览
              name: 'overview',
              component: () => import('@/views/djs/Mine/overview/overview')
            },
            {
              path: 'basicInfo', // 基本信息
              name: 'basicInfo',
              component: () => import('@/views/djs/Mine/basicInfo/basicInfo')
            },
            {
              path: 'bankcard', // 银行卡
              name: 'bankcard',
              component: () => import('@/views/djs/Mine/bankcard/bankcard')
            },
            {
              path: 'referralCode', // 推荐码
              name: 'referralCode',
              component: () => import('@/views/djs/Mine/referralCode/referralCode')
            },
            {
              path: 'lend', // 我的出借
              name: 'userLend',
              component: () => import('@/views/djs/Mine/lend/lend')
            },
            {
              path: 'record', // 交易记录
              name: 'record',
              component: () => import('@/views/djs/Mine/record/record')
            },
            {
              path: 'auto-lend', // 自动出借
              name: 'autoLend',
              component: () => import('@/views/djs/Mine/autoLend/autoLend')
            },
            {
              path: 'calendar', // 回款日历
              name: 'lendCalendar',
              component: () => import('@/views/djs/Mine/calendar/calendar')
            },
            {
              path: 'coupons', // 我的卡券
              name: 'lendCoupons',
              component: () => import('@/views/djs/Mine/coupons/coupons')
            },
            {
              path: 'experience-money', // 体验金
              name: 'experienceMoney',
              component: () => import('@/views/djs/Mine/experienceMoney/experienceMoney')
            }
          ]
        }
      ]
    },
    {
      path: '/announcement',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "announcement" */ '@/views/common/announcement/index.vue'),
          children: [
            {
              path: '/',
              name: 'announcement',
              component: () => import(/* webpackChunkName: "announcementIndex" */ '@/views/common/announcement/announcement.vue')
            },
            {
              path: ':id',
              name: 'announcementDetail',
              component: () => import(/* webpackChunkName: "announcementDetail" */ '@/views/common/announcement/detail.vue')
            }
          ]
        }
      ]
    }
  ]
})
