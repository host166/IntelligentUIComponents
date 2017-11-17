<template>
    <div v-if="visible" ref="mgsbox" :class="position?'iuc_msgbox__position_'+position:''" class="pf inc_screen f28 c8 bgMask iuc_message_box__wrap">
    	<div class="pa pc inc_wrap bgf iuc_message_box" :style="oStyle">
    		<!-- 提示框标题 -->
    		<div class="pr c0 iuc_message_box__header">
    			{{title}}
    			<em @click="closeThisWidgetTap" class="pa pm noStyle c8 close">x</em>
    		</div>
    		<!-- 中间部分 -->
    		<div class="iuc_message_box__main" v-html="contentHTML"></div>
    		<!-- 提示框按钮部分 -->
			<div class="df f26 iuc_message_box__footer">
                <IUCButton @click.native="closeThisWidgetTap" type="cancel" class="btn">取消</IUCButton>
				<IUCButton @click.native="confirmThisWidgetTap" class="btn">确定</IUCButton>
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
            // width : 200
            visible : false,
            // 行内style样式
            oStyle: {}
        }
    },
    // 方法集合
    methods: {
    	// 设置改组件的父层样式
    	oSettingStyle(){
            // var boxW = this.$refs.mgsbox.offsetWidth,
            	// boxH = this.$refs.mgsbox.offsetHeight;

    		this.oStyle = {
    			width : Utils.oAdapt(this.width) + 'px'
    		};
    	},
    	// 关闭当前小组件
    	closeThisWidgetTap(){
    		this.visible = false;
    	},
        // 确定按钮的操作
        confirmThisWidgetTap(){

        }
    },
    // 计算数据
    computed: {

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
    	// 标题
        title:{
            type: String,
            default: '提示'
        },
        // 主要内容
        contentHTML:{
            type: String,
            default: ''
        },
        // 弹框的位置
        position: {
            type: String,
            default: 'middle'
        }
    },
    // 组件模板编译完成时
    mounted(){
    	this.oSettingStyle();
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
	border-radius:10px;
    padding-bottom:20px;
	height:auto;
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
	padding:20px 30px;
}
.iuc_message_box__footer{
    flex-flow:now nowrap;
    justify-content:center;
    .btn{
        margin-left:10px;
    }
}
</style>
