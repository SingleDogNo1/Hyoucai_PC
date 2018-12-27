import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/layout.vue';
import Mine from '@/views/djs/Mine/Mine.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/index',
			name: 'index',
			component: Layout
		},
		{
			path: '/borrow',
			component: Layout,
			children: [
				{
					path: '',
					name: 'borrow',
					component: () => import('@/views/common/Borrow/Borrow')
				}
			]
		},
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
			path: '/mine',
			component: Layout,
			children: [
				{
					path: '',
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
		}
	]
});
