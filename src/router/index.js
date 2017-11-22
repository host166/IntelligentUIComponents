import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'

Vue.use(Router)

export default new Router({
	routes: [{
		name: 'index',
		path: '/',
		component: App
	},{
		name: 'home',
		path: '/home',
		component: App
	}]
})