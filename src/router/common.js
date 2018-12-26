import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/layout.vue';
import Share from 'vue-social-share';
import 'vue-social-share/dist/client.css';

Vue.use(Router);
Vue.use(Share);

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
				}
			]
		},
		{
			path: '/',
			component: Layout,
			children: [
				{
					path: '/announcement',
					component: () =>
						import(/* webpackChunkName: "announcement" */ '@/views/common/Announcement/Index.vue'),
					children: [
						{
							path: '/',
							name: 'announcement',
							component: () =>
								import(/* webpackChunkName: "announcementIndex" */ '@/views/common/Announcement/Announcement.vue')
						},
						{
							path: ':id',
							name: 'announcementDetail',
							component: () =>
								import(/* webpackChunkName: "announcementDetail" */ '@/views/common/Announcement/Detail.vue')
						}
					]
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
    }
	]
});
