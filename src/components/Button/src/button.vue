<template>
    <div class="inc_wrap tac f24 iuc_buttom_box__wrap">
        <div :class="type?'iuc_button_'+type:''" class="iuc_button_style" :style="StyleSize">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Utils from '@/js/utils.js';

export default {
    name: 'IUCButton',
    data() {
        return {

        }
    },
    // 方法集合
    methods: {
        ButtonInit(){
            
        }
    },
    // 计算数据
    computed: {
        StyleSize : function(state){
            var oW = this.width,
                oH = this.height,
                bgc = this.bgcolor;
            // set object style value
            var settingStyle = {};
            var keys = ['width','lineHeight','backgroundColor'];

            // 属性验证
            [oW,oH,bgc].forEach((item,i)=>{
                // 存在则赋值
                if( item ){
                    if( keys[i] === 'width' || keys[i] === 'lineHeight' ){
                        settingStyle[ keys[i] ] = Utils.oAdapt(item) + 'px';
                    }else{
                        settingStyle[ keys[i] ] = item;
                    };
                };
            });

            // 换算尺寸rem = 实际像素/根元素设置的字体像素;  
            // 100 / 20 = ?;
            return settingStyle;
        }
    },
    props: {
        // 尺寸
    	size: String,
        // 类型
        type: {
            type: String,
            // primar/cancel/
            default: 'primary'
        },
        // 背景颜色
        bgcolor: {
            type: String,
            default: '' //'#3fadf5'
        },
        // 宽度
        width: {
            type : Number,
            default:0
        },
        // 高度
        height: {
            type : Number,
            default:0
        }
    },
    // 组件模板编译完成时
    mounted(){
    	// this.ButtonInit();
    }
}
</script>

<style lang="scss">
@import '~@/scss/variable.scss';
.iuc_buttom_box__wrap{
    font-size: inherit;
}
.iuc_button_style{
    padding:0 20PX;
    line-height:60px;
    border-radius: 10px;
    background-color: $baseColor;
    color:#fff;
}
.iuc_button_primary{

}
.iuc_button_cancel{
    border:1px solid #cbcbcb;
    background-color:#fff;
    color:#000;
}
</style>
