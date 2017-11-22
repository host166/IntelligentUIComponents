/**
 * @Date:   2017-03-01 T10:21:23+08:00
 * @Last modified time: 2017-03-01 20:02:15
**/

/* 引入需要全局共享的组件 */

// common css 设置
// import '../scss/common.scss';
// import '../scss/sprite_icon.scss';

/* mintUI css & js */
// 加载等待组件
import { Indicator,Spinner } from 'mint-ui';
import 'mint-ui/lib/indicator/style.css';
import 'mint-ui/lib/spinner/style.css';
// 提示类组件
import { Toast,MessageBox } from 'mint-ui';
import 'mint-ui/lib/toast/style.css';
import 'mint-ui/lib/message-box/style.css';


//element 按钮组件
import { Button } from 'mint-ui';
import 'mint-ui/lib/button/style.css';
//上拉选择组件
import { Actionsheet } from 'mint-ui';
import 'mint-ui/lib/actionsheet/style.css';
// 顶部导航栏组件
import { Header } from 'mint-ui';
import 'mint-ui/lib/header/style.css';
// 下拉/上拉刷新 组件
import { Loadmore } from 'mint-ui';
import 'mint-ui/lib/loadmore/style.css';
// 轮播图组件
import { Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/swipe/style.css';
import 'mint-ui/lib/swipe-item/style.css';
// 选择器 支持多slot联动
import { Picker } from 'mint-ui';
import 'mint-ui/lib/picker/style.css';

// import ElongBridge from '@/js/lib/bridge-2.1.2.js';

/* 可复用的自定义业务组件 */
// import LoadUI from '@/components/LoadUI.vue';
// import CitySelected from '@/components/CitySelected.vue';


//弹框组件

// 确认框组件

// 注册全局组件 myUI
export default {
    install(Vue) {
        // 轮播图组件
        Vue.component('mtSwipe', Swipe);
        Vue.component('mtSwipeItem', SwipeItem);
        // 
        Vue.component('mtActionsheet', Actionsheet);
        // 按钮，提供几种基础样式和尺寸，可自定义图标
        Vue.component('mtButton', Button);

        /* window全局注册的 */

        //提示组件
        window.MessageBox = MessageBox;
        window.Toast = Toast;
        //loading组件
        window.Indicator = Indicator;

        // window.ElongBridge = ElongBridge;

        /* 偏UI的组件 */
        // 顶部导航栏
        Vue.component('mtHeader', Header);
        // 下拉/上拉刷新组件
        Vue.component('mtLoadmore', Loadmore);
        // 加载动画 指定显示类型
        Vue.component('mtSpinner', Spinner);
        // 
        Vue.component('mtPicker', Picker);

        /* 自定义组件 */
        // Vue.component('CitySelected', CitySelected);
        // Vue.component('LoadUI', LoadUI);
        
        // 遮罩组件
        
    }
}


// Vue.component('mtMessageBox', MessageBox);
// Vue.component('mtToast',Toast);
// Vue.component('myCalendar',myCalendar);