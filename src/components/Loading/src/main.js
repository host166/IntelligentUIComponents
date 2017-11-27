/**
* LoadingMethod Components javascript :
* Created by Jiayou Zuo on 2017/11/07
*
*/
import Vue from "Vue";
import Utils from "@/js/utils.js";
import LoadingConstruction from "./main.vue";


var defaults = {
	
};

// 加载等待（组件）模块 函数工厂开发模式
class LoadingFactory{
	constructor(){
		// 方法使用对象集合
		this.instance;

		this.initConfig();
	}
	initConfig(){
		var awakenLoading = Vue.extend(LoadingConstruction);
		this.instance = new awakenLoading({
		    el : document.createElement('div')
		});
	}
	// 组件显示的时长
    loadingVisibleTime(){
    	var _oTime = this.instance.timeout;
        if( !_oTime ) return false;
        Utils.timer('loadingVisibleComponents').create({
            cycle:_oTime/1000,
            status:"install",
            resolveFn: ()=>{
                this.instance.visible = false;
                Utils.timer('loadingVisibleComponents').clear();
            }
        })
    }
	// 展示加载等待
	open(configs,callback){
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

		// DOM更新渲染后
		Vue.nextTick(()=>{
			this.instance.visible = true;
			this.loadingVisibleTime();
		});
		return this;
	}
	// 关闭
	close(){
		// console.log('close');
		// if( this.loadingSleepNumber ){
		// 	Utils.timer('sleepMethod').create({
		// 		cycle:this.loadingSleepNumber,
		// 		status:'install',
		// 		resolveFn:()=>{
		// 			Utils.timer('sleepMethod').create();
		// 			this.instance.visible = false;
		// 		}
		// 	});
		// 	return false;
		// };
		this.instance.visible = false;
	}
	// 延迟
	sleep(n=0){
		this.loadingSleepNumber = n;
		return this;
	}
}

var LoadingMethod = new LoadingFactory;


export default LoadingMethod;
export {
    LoadingMethod
};