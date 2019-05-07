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
          component: () => import(/* webpackChunkName: "lend" */ '@/views/djs/lend/lend.vue'),
          props: route => ({ redPacketId: route.query.redPacketId, couponId: route.query.couponId })
        }
      ]
    },
    {
      path: '/', // 出借详情(轻松投)
      component: Layout,
      children: [
        {
          path: 'easyDetail',
          name: 'easyDetail',
          component: () => import(/* webpackChunkName: "lend" */ '@/views/djs/lend/easyDetail.vue'),
          props: route => ({ projectNo: route.query.projectNo })
        },
        {
          path: 'projectDetail',
          name: 'projectDetail',
          component: () => import(/* webpackChunkName: "lend" */ '@/views/djs/lend/popup/loanDetail.vue')
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
              component: () => import('@/views/djs/Mine/overview/overview')
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
              redirect: 'lend/cjz',
              component: () => import('@/views/djs/Mine/lend/lend'),
              children: [
                {
                  path: 'cjz', // 出借中
                  redirect: 'cjz/projects',
                  component: () => import('@/views/djs/Mine/lend/cjz'),
                  children: [
                    {
                      path: 'projects', // 出借项目列表
                      name: 'cjz-projects',
                      component: () => import('@/views/djs/Mine/lend/cjzProjects')
                    },
                    {
                      path: 'project/:projectNo', // 出借详情
                      name: 'cjz-project',
                      component: () => import('@/views/djs/Mine/lend/cjzProject')
                    },
                    {
                      path: 'project/:projectNo/zqList/:invId', // 出借详情
                      name: 'cjz-zqList',
                      component: () => import('@/views/djs/Mine/lend/cjzZQList')
                    }
                  ]
                },
                {
                  path: 'yjq', // 已结清
                  name: 'lend-yjq',
                  component: () => import('@/views/djs/Mine/lend/yjq')
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
              component: () => import('@/views/djs/Mine/coupons/index')
            },
            {
              path: 'experience-money', // 体验金
              name: 'experienceMoney',
              component: () => import('@/views/djs/Mine/experienceMoney/experienceMoney')
            },
            {
              path: 'charge', // 充值
              name: 'charge',
              component: () => import(/* webpackChunkName: "charge" */ '@/views/djs/Mine/charge/charge.vue')
            },
            {
              path: 'tocash', // 提现
              name: 'tocash',
              component: () => import(/* webpackChunkName: "tocash" */ '@/views/djs/Mine/toCash/toCash.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/announcement', // 网站公告
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
          component: () => import(/* webpackChunkName: "addBankCard" */ '@/views/djs/addBankCard/addBankCard.vue')
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
      path: '/', // 风险测评
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
    },
    {
      path: '/', // 主题活动
      component: Layout,
      children: [
        {
          path: 'activity',
          name: 'activity',
          component: () => import(/* webpackChunkName: "activity" */ '@/views/djs/activity/activity.vue')
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
          component: () => import(/* webpackChunkName: "report" */ '@/views/djs/infoDisclosure/report.vue')
        }
      ]
    },
    {
      path: '/agreement',
      component: Layout,
      children: [
        {
          path: 'register', // 注册协议
          name: 'registerAgreement',
          component: () => import('@/views/common/agreement/register')
        },
        {
          path: 'businessAuth', // 业务授权协议
          name: 'businessAuthAgreement',
          component: () => import('@/views/common/agreement/businessAuth')
        },
        {
          path: 'autoLend', // 自动出借
          name: 'autoLendAgreement',
          component: () => import('@/views/djs/agreement/autoLend')
        },
        {
          path: 'debtAssignment', // 债权转让
          name: 'debtAssignmentAgreement',
          component: () => import('@/views/djs/agreement/debtAssignment')
        },
        {
          path: 'riskNoticationLetter', // 风险告知书
          name: 'riskNoticationLetterAgreement',
          component: () => import('@/views/djs/agreement/riskNoticationLetter')
        }
      ]
    },
    {
      path: '/bankAccount', // 开户
      component: Layout,
      children: [
        {
          path: 'openAccount', // 开户
          name: 'account',
          component: () => import(/* webpackChunkName: "bankAccount" */ '@/views/common/bankAccount/openAccount.vue')
        },
        {
          path: 'signAgreement', // 签约
          name: 'sign',
          component: () => import(/* webpackChunkName: "bankAccount" */ '@/views/common/bankAccount/signAgreement.vue')
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'realNameAccount',
          name: 'realNameAccount',
          redirect: 'realNameAccount/realNameAuth',
          component: () => import(/* webpackChunkName: "realNameAccount" */ '@/views/common/realNameAccount/index.vue'),
          children: [
            {
              path: 'realNameAuth',
              name: 'realNameAuth',
              component: () => import(/* webpackChunkName: "realNameAccount" */ '@/views/common/realNameAccount/realNameAuth.vue')
            },
            {
              path: 'bindCard',
              name: 'realNameBindCard',
              component: () => import(/* webpackChunkName: "realNameAccount" */ '@/views/common/realNameAccount/bindCard.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/', // 联系我们
      component: Layout,
      children: [
        {
          path: 'contact',
          name: 'contact',
          component: () => import(/* webpackChunkName: "contact" */ '@/views/hyc/contact/index.vue')
        }
      ]
    }
  ]
})
