/**
* MessageBox Components javascript :
* Created by Jiayou Zuo on 2017/11/07
*
*/
import Vue from "Vue";
import MessageBoxConstruction from "./main.vue";

// 消息弹层函数工厂
function MessageBoxFactory(config){
	this.options = {};
	for( let i in config ) this.options[i] = config[i];
	// 方法使用对象集合
	this.instance;

	this.init();
};
MessageBoxFactory.prototype.init = function(){
	
	var awakenMessageBox = Vue.extend(MessageBoxConstruction);
	this.instance = new awakenMessageBox({
	    el : document.createElement('div')
	});
	document.body.appendChild(this.instance.$el);
};

// 提示方式 alert提示
MessageBoxFactory.prototype.alert = function(){
	this.instance.visible = true;
	console.log();
};


var MessageBox = new MessageBoxFactory;


export default MessageBox;
export {
    MessageBox
};