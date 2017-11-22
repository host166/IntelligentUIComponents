// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//全局函数工具集
import tools from './js/utils'

import uiWidget from './index.js'

// var widget = require('./index.js');
window.Vue = Vue;
// 开启debug模式
Vue.config.debug = true
// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false


Vue.use(tools);
Vue.use(uiWidget);


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})