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
          component: () => import('@/views/hyc/Index/Index')
        }
      ]
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
        },
        {
          path: 'resetResult',
          name: 'resetResult',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/login/resetResult.vue')
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
              component: () => import('@/views/hyc/Mine/overview/overview')
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
              redirect: 'lend/qst',
              component: () => import('@/views/hyc/Mine/lend/lend'),
              children: [
                {
                  path: 'qst',
                  name: 'QST',
                  component: () => import('@/views/hyc/Mine/JHB/JHB')
                },
                {
                  path: 'zxt',
                  name: 'ZXT',
                  component: () => import('@/views/hyc/Mine/SB/SB')
                }
              ]
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
            },
            {
              path: 'charge', // 充值
              name: 'charge',
              component: () => import(/* webpackChunkName: "record" */ '@/views/djs/charge/charge.vue')
            }
          ]
        }
      ]
    }
  ]
})
