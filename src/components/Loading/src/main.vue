<template>

<div v-show="visible" class="pf inc_screen f32 c8 iuc_loading_box__wrap">
    <div v-if="!image" :class="loadstyle?'iuc_loading__style_'+loadstyle:''" class="pa pc iuc_loading__style_mask iuc_loading_box">
        <!-- 加载 -->
        <div v-if="loadstyle==='twinkle'" class="pr iuc_loading__stage_wrap">
            <div v-for="(v,i) in animationMembers" :class="'circle'+(i+1)" class="circle">
                <em :class="animate+' animated'" class="before" :style="{backgroundColor:loadcolor}"></em>
            </div>
        </div>
        <!-- 文案 -->
        <div v-if="loadtext" class="inc_wrap tac iuc_loading__loadtext_wrap">
            {{loadtext}}
        </div>
    </div>
</div>

</template>

<script>
import Utils from '@/js/utils.js';

export default {
    name: 'Loading',
    data() {
        return {
            visible: false,
            // 使用图片风格做加载
            image : false,
            // 可接入第3方入场动画设置
            animate : 'twinkle',
            // 设置加载样式颜色
            loadcolor : "#ccc",
            // 超时时间设置 单位毫秒(ms)
            timeout : 10000,
            //文案提示
            loadtext : ''
        }
    },
    // 方法集合
    methods: {
    	loadingWidgetInit(){
            
        }
        
    },
    // 计算数据
    computed: {
        animationMembers(){
            return 12;
        }
    },
    props: {
        loadstyle:{
            type: String,
            default: 'twinkle'
        }
    },
    // 组件模板编译完成时
    mounted(){
        this.loadingWidgetInit();	
    }
}
</script>
    

<style lang="scss">
// 闪烁start
.iuc_loading__style_twinkle{
    width:160px;
    min-height:160px;
    padding:30px;
}
.iuc_loading__stage_wrap{
    width:90px; height:90px;
    .twinkle{
        -webkit-animation-name:iuc_twinkle_circle;
                animation-name:iuc_twinkle_circle;
    }
    .circle{
        width:100%; height:100%;
        top:0; left:0; position:absolute; z-index:1;
        .loadcolor{
            background-color:#000;
        }
        .before{
            // background-color:red;
            // content: " ";
            display: block;
            margin: 0 auto;
            width: 10px;
            height: 20px;
            border-radius: 100%;
            animation-duration:1.2s;
            animation-iteration-count:infinite;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both;

            // animation: iuc_twinkle_circle 1.2s infinite ease-in-out both;
        }
    }
    .circle1{
        transform:rotate(0deg);
        .before{
            -webkit-animation-delay: 0s;
            animation-delay: 0s;
        }
    }
    .circle2{
        transform:rotate(30deg);
        .before{
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
        }
    }
    .circle3{
        transform:rotate(60deg);
        .before{
            -webkit-animation-delay: -1s;
            animation-delay: -1s;
        }
    }
    .circle4{
        transform:rotate(90deg);
        .before{
            -webkit-animation-delay: -.9s;
            animation-delay: -.9s;
        }
    }
    .circle5{
        transform:rotate(120deg);
        .before{
            -webkit-animation-delay: -.8s;
            animation-delay: -.8s;
        }
    }
    .circle6{
        transform:rotate(150deg);
        .before{
            -webkit-animation-delay: -.7s;
            animation-delay: -.7s;
        }
    }
    .circle7{
        transform:rotate(180deg);
        .before{
            -webkit-animation-delay: -.6s;
            animation-delay: -.6s;
        }
    }
    .circle8{
        transform:rotate(210deg);
        .before{
            -webkit-animation-delay: -.5s;
            animation-delay: -.5s;
        }
    }
    .circle9{
        transform:rotate(240deg);
        .before{
            -webkit-animation-delay: -.4s;
            animation-delay: -.4s;
        }
    }
    .circle10{
        transform:rotate(270deg);
        .before{
            -webkit-animation-delay: -.3s;
            animation-delay: -.3s;
        }
    }
    .circle11{
        transform:rotate(300deg);
        .before{
            -webkit-animation-delay: -.2s;
            animation-delay: -.2s;
        }
    }
    .circle12{
        transform:rotate(330deg);
        .before{
            -webkit-animation-delay: -.1s;
            animation-delay: -.1s;
        }
    }
}
@-webkit-keyframes iuc_twinkle_circle{
    0%, 39%, 100% { opacity:0 }
    40% { opacity:1 }
}
@keyframes iuc_twinkle_circle{
    0%, 39%, 100% { opacity:0 }
    40% { opacity:1 }
}
// 闪烁end

.iuc_loading__style_mask{
    background-color:rgba(0,0,0,0.7);
}
.iuc_loading__loadtext_wrap{
    color:#fff;
    padding-top:40px;
}

// 弹屏的位置
.iuc_loading_box__wrap{
    display:flex;
    flex-flow:column nowrap;
    justify-content:center;
}
.iuc_loading_box{
    border-radius:10px;
    display:flex;
    flex-flow:column nowrap;
    justify-content:center;
}
.iuc_loading__stage_wrap{
    margin:0 auto;
}
</style>
