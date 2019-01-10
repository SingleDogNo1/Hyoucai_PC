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
      path: '/download',
      component: Layout,
      children: [
        {
          path: '',
          name: 'download',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/download/index.vue')
        }
      ]
    },
    {
      path: '/account',
      component: Layout,
      children: [
        {
          path: '',
          name: 'account',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/openAccount/index.vue')
        }
      ]
    },
    {
      path: '/mine',
      component: Layout,
      children: [
        {
          path: '',
          component: Mine,
          redirect: '/mine/overview',
          children: [
            {
              path: 'overview', // 账户总览
              name: 'overview',
              component: () => import('@/views/hyc/Mine/overview/overview')
            },
            {
              path: 'basicInfo', // 基本信息
              name: 'basicInfo',
              component: () => import('@/views/common/basicInfo/basicInfo')
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
              component: () => import('@/views/hyc/Mine/lend/lend'),
              children: [
                {
                  path: '/qst/:status',
                  name: 'QSTList',
                  component: () => import('@/views/hyc/Mine/JHB/JHB')
                },
                {
                  path: '/zxt/:date/:status',
                  name: 'ZXTList',
                  component: () => import('@/views/hyc/Mine/SB/SB')
                }
              ]
            },
            {
              path: 'qst-detail', // 轻松投详情
              name: 'QSTDetail',
              component: () => import('@/views/hyc/Mine/JHBDetail/JHBDetail')
            },
            {
              path: 'zxt-detail', // 自选投详情
              name: 'ZXTDetail',
              component: () => import('@/views/hyc/Mine/SBDetail/SBDetail')
            },
            {
              path: 'record', // 交易记录
              name: 'record',
              component: () => import('@/views/hyc/Mine/record/record')
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
              component: () => import('@/views/hyc/Mine/coupons/index')
            },
            {
              path: 'experience-money', // 体验金
              name: 'experienceMoney',
              component: () => import('@/views/djs/Mine/experienceMoney/experienceMoney')
            },
            {
              path: 'charge', // 充值
              name: 'charge',
              component: () => import(/* webpackChunkName: "record" */ '@/views/hyc/Mine/charge/charge.vue')
            },
            {
              path: 'tocash', // 提现
              name: 'tocash',
              component: () => import(/* webpackChunkName: "tocash" */ '@/views/hyc/Mine/toCash/toCash.vue')
            }
          ]
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
          component: () => import(/* webpackChunkName: "calculator" */ '@/views/common/calculator/calculator.vue')
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
          component: () => import(/* webpackChunkName: "lend" */ '@/views/hyc/lend/lend.vue')
        }
      ]
    },
    {
      path: '/announcement',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "announcement" */ '@/views/hyc/announcement/index.vue'),
          children: [
            {
              path: '/',
              name: 'announcement',
              component: () => import(/* webpackChunkName: "announcementIndex" */ '@/views/hyc/announcement/announcement.vue')
            },
            {
              path: ':id',
              name: 'announcementDetail',
              component: () => import(/* webpackChunkName: "announcementDetail" */ '@/views/hyc/announcement/detail.vue')
            }
          ]
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
          component: () => import(/* webpackChunkName: "helpCenter" */ '@/views/hyc/helpCenter/index.vue')
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
          component: () => import(/* webpackChunkName: "infoDisclosure" */ '@/views/hyc/infoDisclosure/index.vue')
        }
      ]
    },
    {
      path: '/', // 运营报告
      component: Layout,
      children: [
        {
          path: 'report',
          name: 'report',
          component: () => import(/* webpackChunkName: "report" */ '@/views/hyc/infoDisclosure/report.vue')
        }
      ]
    },
    {
      path: '/', // 主题活动
      component: Layout,
      children: [
        {
          path: 'activity',
          name: 'activity',
          component: () => import(/* webpackChunkName: "activity" */ '@/views/hyc/activity/activity.vue')
        }
      ]
    },
    {
      path: '/sign',
      component: Layout,
      children: [
        {
          path: '', // 签约
          name: 'sign',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/signContract/index.vue')
        }
      ]
    }
  ]
})
