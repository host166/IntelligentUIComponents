<template>
    <div @click="closeOnClickModelPrompt" v-if="visible" ref="mgsbox" :class="position?'iuc_msgbox__position_'+position:''" class="pf inc_screen f28 c8 bgMask iuc_message_box__wrap">
    	<div class="pa pc inc_wrap bgf iuc_message_box" :style="oStyle">
    		<!-- 提示框标题 -->
    		<div v-if="title" class="pr c0 iuc_message_box__header">
    			<strong class="show">{{title}}</strong>
    			<em @click="closeThisWidgetTap" class="pa pm noStyle c8 close">x</em>
    		</div>
    		<!-- 中间部分 -->
    		<div class="inc_wrap oys iuc_message_box__main" v-html="message"></div>
    		<!-- 提示框按钮部分 -->
			<div class="df f26 iuc_message_box__footer">
                <IUCButton v-show="cancelVisible" @click.native="closeThisWidgetTap" type="cancel" class="btn">{{cancelText}}</IUCButton>
				<IUCButton v-show="confirmVisible" @click.native="confirmThisWidgetTap" class="btn">{{confirmText}}</IUCButton>
			</div>
    	</div>
    </div>
</template>

<script>
import Utils from '@/js/utils.js';
import IUCButton from '@/components/Button/src/button.vue';

export default {
    name: 'MessageBox',
    data() {
        return {
            // 标题文案
            title: '提示',
            // is show
            visible : false,
            // 类型 success / info / warning / error
            type : ''
        }
    },
    // 方法集合
    methods: {
    	// 关闭当前小组件
    	closeThisWidgetTap(){
    		this.visible = false;
    	},
        // 确定按钮的操作
        confirmThisWidgetTap(){
            this.callback();
            this.closeThisWidgetTap();
        },
        // 点击蒙版关闭弹窗
        closeOnClickModelPrompt(){
            if( !this.closeOnClickModel ) return false;
            this.closeThisWidgetTap();
        }
    },
    // 计算数据
    computed: {
        // 行内style样式
        oStyle(){
            return {
                width : Utils.oAdapt(this.width) + 'px'
            }
        }
    },
    props: {
        // 出场动画
        animate: {
            type: String,
            default: 'fade'
        },
    	// 宽度
    	width:{
    		type: Number,
    		default: 600
    	},
        // 主要内容
        message:{
            type: String,
            default: ''
        },
        // 弹框的位置
        position: {
            type: String,
            default: 'middle'
        },
        // 取消按钮是否显示
        cancelVisible: {
            type: Boolean,
            default: false
        },
        // 确定按钮是否显示
        confirmVisible: {
            type: Boolean,
            default: true
        },
        // 取消按钮的文案
        cancelText: {
            type: String,
            default: '取消'
        },
        // 确定按钮的文案
        confirmText: {
            type: String,
            default: '确定'
        },
        // 通过点击蒙版关闭弹窗
        closeOnClickModel:Boolean
    },
    // 组件模板编译完成时
    mounted(){
    	
    	// console.log( this.$refs.mgsbox );
    },
    components: {
        IUCButton
    }
}
</script>
    

<style lang="scss">
// 弹屏的位置
.iuc_msgbox__position_middle{
    display:flex;
    flex-flow:column nowrap;
    justify-content:center;
}
.iuc_msgbox__position_top{
    display:flex;
    flex-flow:column nowrap;
    justify-content:flex-start;
    .iuc_message_box{
        top:10%;
    }
}
.iuc_msgbox__position_bottom{
    display:flex;
    flex-flow:column nowrap;
    justify-content:flext-end;
    .iuc_message_box{
        bottom:10%;
    }
}

.iuc_message_box{
	border-radius:16px;
    padding-bottom:20px;
}
.iuc_message_box__header,.iuc_message_box__main,.iuc_message_box__footer{
    padding:0 30px;
}
.iuc_message_box__header{
    border-bottom:1px solid #cbcbcb;
    line-height:80px;
	.close{
		right:30px; z-index:10;
		cursor:pointer;
	}
}
.iuc_message_box__main{
    max-height:1000px;
	padding:20px 30px;
}

.iuc_message_box__footer{
    flex-flow:now nowrap;
    justify-content:center;
    .btn{
        margin-left:10px;
        margin-right:15px;
    }
}
</style>
