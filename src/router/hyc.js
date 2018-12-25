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
		}
	]
});
