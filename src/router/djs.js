import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/layout.vue';
import Mine from '@/layout/userIndex.vue';

Vue.use(Router);

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
			path: '/',
			component: Layout,
			children: [
				{
					path: 'mine',
					component: Mine,
					children: [
						{
							path: 'overview',
							name: 'overview',
							component: () => import('@/views/djs/Mine/overview')
						},
						{
							path: 'basicInfo',
							name: 'basicInfo',
							component: () => import('@/views/djs/Mine/basicInfo')
						},
						{
							path: 'bankcard',
							name: 'bankcard',
							component: () => import('@/views/djs/Mine/bankcard')
						},
						{
							path: 'referralCode',
							name: 'referralCode',
							component: () => import('@/views/djs/Mine/referralCode')
						},
						{
							path: 'record', // 交易记录
							name: 'record',
							component: () => import(/* webpackChunkName: "record" */ '@/views/djs/record/record.vue')
						},
						{
							path: 'charge', // 充值
							name: 'charge',
							component: () => import(/* webpackChunkName: "record" */ '@/views/djs/charge/charge.vue')
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
					component: () =>
						import(/* webpackChunkName: "announcement" */ '@/views/common/announcement/index.vue'),
					children: [
						{
							path: '/',
							name: 'announcement',
							component: () =>
								import(/* webpackChunkName: "announcementIndex" */ '@/views/common/announcement/announcement.vue')
						},
						{
							path: ':id',
							name: 'announcementDetail',
							component: () =>
								import(/* webpackChunkName: "announcementDetail" */ '@/views/common/announcement/detail.vue')
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
					component: () =>
						import(/* webpackChunkName: "register" */ '@/views/common/login/forgetPassword.vue')
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
		}
	]
});
