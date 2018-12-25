import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/layout.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/index',
			name: 'index',
			component: Layout
		},
		{
			path: '/announcement',
			name: 'announcement',
			component: () => import(/* webpackChunkName: "announcement" */ '@/views/common/announcement/index.vue'),
			meta: { title: '网站公告' }
		}
	]
});
