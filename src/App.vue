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

        // Vue.Tool.oAdapt.designInfo = {
        //     design : {w:750,h:1334},
        //     mode : 'transverse'
        // };
        // Vue.Tool.adaptation({
        //     name : 'windowSizeChange',
        //     px : 20,
        //     fn : (apx)=>{
        //         Vue.Tool.query('html').style.fontSize = apx+"px";
        //     }
        // });
    },
    mounted(){
        this.$msgbox.alert();
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
