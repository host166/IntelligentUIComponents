/**
* MessageBox Components javascript :
* Created by Jiayou Zuo on 2017/11/07
*
*/
import Vue from "Vue";
import Utils from "@/js/utils.js";
import MessageBoxConstruction from "./main.vue";


var defaults = {
	// @param title     : 标题名称
	title: "",
	// @param type      : 标题类型 用来显示图标 success / info / warning / error
	type : "",	
	// @param width     : 宽度设置（设计稿宽度）
	width: "",
	// @param message   : 需要显示的信息内容
	message : "",
	// @param position  : 弹框的坐标位置
	position: "middle",
	// @param cancelText: 取消按钮的文案
	cancelText: "",
	// @param cancelText: 确定按钮的文案
	cancelText: "",
	// @param cancelVisible { default:false } : 取消按钮是否显示
	cancelVisible : false,
	// @param confirmVisible { default:true } : 确定按钮是否显示 
	confirmVisible: true
};



// 消息弹层函数工厂
function MessageBoxFactory(config){
	// this.options = defaults;
	// console.log( this.options );
	// for( let i in config ) this.options[i] = config[i];
	
	this.initConfig();
	// this.init();
};

// 初始化配置
MessageBoxFactory.prototype.initConfig = function(){
	// 方法使用对象集合
	this.instance;

	var awakenMessageBox = Vue.extend(MessageBoxConstruction);
	this.instance = new awakenMessageBox({
	    el : document.createElement('div')
	});
},

// 方法初始化
// MessageBoxFactory.prototype.init = function(){};

// Message方式的提示
// @param callback  : 回调参数
MessageBoxFactory.prototype.MessageBox = function( configs,callback ){
	var that = this;
	var options = Utils.merge({},defaults,this.instance.$props,this.instance.$data);
	for( let i in configs ) options[i] = configs[i];

	//console.log( options );	//this.instance.$props
	for (let x in options) {
		// 校验这个对象里面没有来自集成的对象
        if (options.hasOwnProperty(x)) {
        	this.instance[x] = options[x];
        };
    };
	document.body.appendChild(this.instance.$el);

	// 如果支持promise方法时
	// if (typeof Promise !== 'undefined') {
	// 	return new Promise((resolve, reject) => {
	// 		// this.instance.visible = true;
	// 		// this.instance.callback = callback;
	// 		// resolve();
	// 	});
	// };

	// DOM更新渲染后
	Vue.nextTick(()=>{
		this.instance.visible = true;
		this.instance.callback = callback;
	});
};

// 提示方式 alert提示
MessageBoxFactory.prototype.alert = function(msg,tit=''){
	var _message = {
		message: msg
	};
	if( typeof arguments[1] === 'function' ){
		_message['title'] = '';
	}else if( typeof arguments[1] === 'string' ){
		_message['title'] = tit;
	};
	return this.MessageBox(_message,arguments[2]);
	// if( typeof this.instance.title === 'string' ){};
};


var MessageBox = new MessageBoxFactory;


export default MessageBox;
export {
    MessageBox
};