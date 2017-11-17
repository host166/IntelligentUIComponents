/**
* created by Time on 2017/11/08
* 安装插件方法
*	
*/
import Vue from 'vue';
import MessageBox from './components/MessageBox/index.js';
import Button from './components/Button/index.js';


// other 
import { version } from '../package.json';

const widgets = [
	Button
];

// 注册全局方法
var install = function(Vue,opts={}){
	// // callback new array data
	widgets.map(item => {
		// console.log( item.name, item );
		Vue.component(item.name, item);
	});
    // console.log('in install method');

	Vue.prototype.$msgbox = MessageBox;
};

// verify that the window or Vue object exists to browser 
if (typeof window !== 'undefined' && window.Vue) {	// auto install
    install(window.Vue);
}

export default {
	version,
	install,
	Button,
	MessageBox
}