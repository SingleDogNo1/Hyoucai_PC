import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/layout.vue'
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css'

Vue.use(Router)
Vue.use(Share)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: Layout,
			children: [
				{
					path: '/register/mobile',
					name: 'mobile',
					component: () => import(/* webpackChunkName: "register" */ '@/views/common/register/mobile.vue')
				},
				{
					path: '/announcement',
					name: 'announcement',
					component: () =>
						import(/* webpackChunkName: "announcement" */ '@/views/common/announcement/index.vue'),
					meta: { title: '网站公告' },
					redirect: "/announcement/index",
					children: [
						{
							path: 'index',
							name: 'announcementIndex',
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
