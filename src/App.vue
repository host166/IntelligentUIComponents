<template>
    <div class="pa pn inc_screen">
        <!-- <MessagesBox></MessagesBox> -->
        <!-- <IUCButton>确定</IUCButton> -->
    </div>
</template>

<script>
import Vue from 'vue';
import Utils from '@/js/utils.js';

// import MessagesBox from './components/MessageBox/src/main.vue';

export default {
    name: 'app',
    data(){
        return {

        }
    },
    beforeCreate(){
        Utils.setData('oAdapt',{
            'design': {w:750,h:1334},
            'mode'  : 'transverse'
        });
        Utils.oAdapt({
            name : 'windowSizeChange',
            px : 20,
            fn : (apx)=>{
                Utils.query('html').style.fontSize = apx + "px";
            }
        });
    },
    mounted(){
        this.$msgbox.MessageBox({
            title : '艺龙机票',
            position:"middle",
            cancelVisible:true,
            message:'<p>航班机票</p><p>模板文案模板文案模板文案模板文案模板文案模板文案。</p>'
        },function(){
            console.log("callback method");
        });

        // this.$msgbox.alert('航班机票','艺龙出行',()=>{
        //     console.log(123)
        // });
    },
    components: {
        // MessagesBox
    }
}
</script>

<style lang="scss">
@import "./scss/common.scss";
@import "./scss/basecss.scss";


</style>
