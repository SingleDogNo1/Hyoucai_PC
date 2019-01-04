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
        },
        {
          path: 'safety',
          name: 'safety',
          component: () => import('@/views/common/SafetyMeasures/index')
        }
      ]
    },
    {
      path: '/', // 收益计算器
      component: Layout,
      children: [
        {
          path: 'calculator',
          name: 'calculator',
          component: () => import(/* webpackChunkName: "calculator" */ '@/views/djs/calculator/calculator.vue')
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
            },
            {
              path: 'charge', // 充值
              name: 'charge',
              component: () => import(/* webpackChunkName: "record" */ '@/views/djs/charge/charge.vue')
            },
            {
              path: 'tocash', // 提现
              name: 'tocash',
              component: () => import(/* webpackChunkName: "tocash" */ '@/views/djs/toCash/toCash.vue')
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
          component: () => import(/* webpackChunkName: "announcement" */ '@/views/djs/announcement/index.vue'),
          children: [
            {
              path: '/',
              name: 'announcement',
              component: () => import(/* webpackChunkName: "announcementIndex" */ '@/views/djs/announcement/announcement.vue')
            },
            {
              path: ':id',
              name: 'announcementDetail',
              component: () => import(/* webpackChunkName: "announcementDetail" */ '@/views/djs/announcement/detail.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/', // 我要出借
      component: Layout,
      children: [
        {
          path: 'addBankCard',
          name: 'addBankCard',
          component: () => import(/* webpackChunkName: "lend" */ '@/views/djs/addBankCard/addBankCard.vue')
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
    },
    {
      path: '/', // 帮助中心
      component: Layout,
      children: [
        {
          path: 'helpCenter',
          name: 'helpCenter',
          component: () => import(/* webpackChunkName: "helpCenter" */ '@/views/djs/helpCenter/index.vue')
        }
      ]
    },
    {
      path: '/', // 我要出借
      component: Layout,
      children: [
        {
          path: 'riskAss',
          name: 'riskAss',
          component: () => import(/* webpackChunkName: "riskAss" */ '@/views/common/RiskAssessment/index.vue')
        }
      ]
    },
    {
      path: '/', // 信息披露
      component: Layout,
      children: [
        {
          path: 'infoDisclosure',
          name: 'infoDisclosure',
          component: () => import(/* webpackChunkName: "infoDisclosure" */ '@/views/djs/infoDisclosure/index.vue')
        }
      ]
    }
  ]
})
