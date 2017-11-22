import Vue from 'vue';

//创建全局公共函数
const utils = utilsTool();
const tools = {
    query : utils.$$,
    winWidth : utils.win(),
    winHeight : utils.win(),
    Storage : utils.Storage,
    adaptation : utils.adaptation,
    // setLoading : utils.indicatorLoading,
    utilityType : utils.utilityType,
    isEmptyObject : utils.isEmptyObject,
    isObjectNo : utils.isObjectNo,
    isConform : utils.isConform,
    searchObjects : utils.searchObjects,
    resetObjectValue : utils.resetObjectValue,
    objectDuplicate : utils.objectDuplicate,
    oAdapt : utils.intelligentAuxiliary,
    //发起请求服务端数据
    ajax(arg){  
        // //请求头的基本设置信息
        // const setHeaders = {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     "Accept" : "application/json; charset=utf-8",
        //     "X-Requested-With" : "XMLHttpRequest"
        // };
        // //对象存在且不为空的时候赋值
        // if( !!arg.headers && !!tools.isEmptyObject(arg.headers) ){
        //     for( let x in arg.headers ){
        //         setHeaders[x] = arg.headers[x];
        //     };
        // };
        // // console.log( setHeaders,arg );
        // // arg: 数据请求的一些参数
        
        // //默认结构
        // const options = {
        //     url    : "",
        //     params : arg.params,
        //     method : arg.method || "GET",
        //     headers: setHeaders,
        //     body : arg.body,            //是否FormData string
        //     mockData : arg.mockData,    //mock的数据
        //     //将request body以application/x-www-form-urlencoded content type
        //     emulateJSON : arg.emulateJSON || true,  //是否（json方式）发送
        //     isBack : arg.isBack===false&&!arg.mockData?false:true,      //请求数据的时候允许后退||前进操作  默认是true
        //     indicator : arg.indicator //false禁止使用loading提示组件
        //     // success: arg.success || function() {},
        //     // error  : arg.error || function() {}
        // };

        const options = {
            url    : "",
            // 参数
            params : {},
            // 请求方式
            method : "POST",
            // 请求头的基本设置信息
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Accept" : "application/json; charset=utf-8",
                "X-Requested-With" : "XMLHttpRequest"
            },
            // 是否使用formdata提交 默认'' (string类型)
            body: undefined,  // POST参数需要提交给body              
            // mock数据对象 开启就使用指定数据返回
            mockData : false,
            //将request body以application/x-www-form-urlencoded content type
            emulateJSON : true,  // json方式发送
            //请求数据的时候是否允许后退||前进操作  默认是true
            isBack : true,      
            //false禁止使用loading提示组件
            indicator : true,
            //超时时间 单位是毫秒
            timeout : 5000
            // success: arg.success || function() {},
            // error  : arg.error || function() {}
        };
        
        for( let x in arg ){
            // 追加 headers 对象属性
            if( x === 'headers' ){
                for( let j in arg.headers ){
                    options.headers[j] = arg.headers[j];
                };
            }else{
                options[x] = arg[x];
            };
        };

        //获取api中的接口地址
        var realUrl = Vue.apiConfig;
        //匹配到api中的对象
        var urls = arg.url.split('.');
        // console.log(realUrl,urls,realUrl[urls[0]]);

        //解构字符串然后匹配接口请求
        //realUrl = tools.searchObjects(realUrl,urls);
        for (let i = 0, len = urls.length; i < len; i++) {
            realUrl = realUrl[urls[i]];
        };

        // console.log( realUrl );

        //如果有http字符说明请求的域不统一了
        // if( arg.url.substring(0,4) == "http" ){};
        // if( realUrl.indexOf("//") != -1 ){
        //     options.url = realUrl;
        // };

        //默认的请求地址 （比如可以添加前缀链接：`/flight/${realUrl}`）
        options.url = realUrl;

        // console.log(options.url,basePath,realUrl);
        // 加载等待组件 不是假数据 && 需要等待提示 && 有方法可以执行
        // if( options.indicator ){};
        // !options.mockData && options.indicator && tools.setLoading({
        //     text : "正在加载",
        //     spinnerType : "fading-circle",
        //     timeout : options.timeout
        // }).open();

        //路由钩子 
        Vue.router.beforeEach((to, from, next) => {
            //false：不允许后退||前进操作
            next(options.isBack);
        });
        //server端的参数
        const serverParams = {
            url    : options.url,
            method : options.method,
            headers: options.headers,
            emulateJSON: options.emulateJSON
        };
        // 根据Method参数不同传值
        if( options.method === 'POST' ){
            serverParams.body = options.params;
        }
        else if( options.method === 'GET' ){
            serverParams.params = options.params;
        };

        // 请求数据
        var oPromise = new Promise( (resolve, reject) => {
            //mock数据
            if( !!options.mockData ){
                resolve(options.mockData);
                return false;
            };
            //vue的ajax数据请求方法
            Vue.http(serverParams).then( (data) => {    //response：求情结果
                
                options.isBack = true;
                // tools.setLoading().close();
                // console.log(data.body,data);
                resolve(data.body,data);
            },()=>{
                options.isBack = true;
                // tools.setLoading().close();
            }).catch( (err)=> {
                options.isBack = true;
                // tools.setLoading().close();
                // MessageBox.alert('数据加载失败，请检查网络');
                // tools.Timer('resourceLoadingPrompt').create({
                //     cycle    : 1,      
                //     resolveFn: function(){}
                // });
                // err.error = false;
                reject(err);
            });
        });
        return oPromise;
    },
    //主要用于移动端翻转设备时的处理
    orientationFunc(name,fn){  
        var timer = "",
            obj = utils.intelligentAuxiliary.orientationJson;

        obj[name] = fn;
        if (typeof window.onorientationchange == "undefined") {
            window.onresize = function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    for (var x in obj) {
                        obj[x]();
                    };
                }, 50);
            };
        } else {
            window.onorientationchange = function() {
                if (window.orientation == 0 || window.orientation == 180 || window.orientation == 90 || window.orientation == -90) {
                    for (var x in obj) {
                        obj[x](window.orientation);
                    };
                };
            };
        };
    },
    //修改根元素上的文字的font-size大小 // utils.win().width / (375 / 10)
    //switch切换元素状态 
    tapSwitch(obj){    
        //对象
        const opt = {
            that : null,         //指针
            page : 0,
            oDataName : "",    //对象名 string
            switchType : 0,      //0:选中当前关闭其它也可关闭自身 1:选中当前关闭其他不可关闭自身 2:选中当前不可关闭其他可关闭自身
            oStateData : [],     //数组对象的状态  true：show false：hide
            fn : ()=>{}
        };
        for( let x in obj ){
            opt[x] = obj[x];
        };

        var _data = opt.oStateData;
        switch(opt.switchType){
            case 0:
                if( !_data[opt.page] ){
                    _data.splice(0,opt.oStateData.length);
                    _data[opt.page] = true;
                    // _data.splice(opt.page,1,true);
                }else{
                    // _data[opt.page] = false;
                    _data.splice(opt.page,1);

                };
                break;
            case 1:
                if( !_data[opt.page] ){
                    _data.splice(0,opt.oStateData.length);
                    _data[opt.page] = true;
                    // _data.splice(opt.page,1,true);
                };
                break;
            case 2:
                //_data[opt.page] = !_data[opt.page]?true:_data.splice(opt.page,1);
                // console.log("_data[opt.page]:",_data[opt.page]);
                if( !_data[opt.page] ){
                    _data[opt.page] = false;
                    _data.splice(opt.page,1,true);
                }else{
                    _data.splice(opt.page,1,false);
                };
                break;
        };

        var oTemp = opt.that, //临时对象
            oArr = opt.oDataName.split(".");
        // console.log( oTemp.viewFlightRende );
        oArr.forEach( (item,i)=>{
            oTemp = oTemp[item];
        });
        // console.log( "oTemp:",oTemp,opt.oStateData );
        oTemp = opt.oStateData; //赋值操作
        opt.fn(_data[opt.page],opt.page);
    },
    //设置DOM元素的高度
    setDOMHeight(winattr,domattr){ 
        var result = 0;
        domattr.forEach( (elem,index)=> {
            result += elem;
        });
        return winattr-result;
    },
    //以本地时间为单位的计时器
    Timer(name) {  //n, t, fn
        // 保存时间线的对象
        const oTimeLine = utils.intelligentAuxiliary.timelineObject,
              timeCycle = 1000/60;  //帧数 || 时间周期

        var oTimer = {
            // 清除定时器的方法
            clear(clearname=name){
                // console.log('clear:',oTimeLine);
                if( oTimeLine[clearname] ){
                    clearInterval( oTimeLine[clearname] );
                    oTimeLine[clearname] = undefined;
                    delete oTimeLine[clearname];
                };
                return this;
            },
            // 创建定时器的方法
            create(obj){
                const opt = {
                    cycle    : 0,              //周期 时长
                    status   : 'install',      //计时器的状态  install初次安装 inter 持续 clear清除 stop暂停 start开始 
                    resolveFn: function(){}    //计时器结束时的回调
                };
                for( let x in obj ) opt[x] = obj[x];

                // 封装计时器方法
                var _timerMethod = (cyclenumber) => {
                    if( oTimeLine[name] ){
                        clearInterval( oTimeLine[name] );
                        oTimeLine[name] = undefined;
                    };
                    // 对应对象存放时间控制方法
                    var timeStart = (new Date()).getTime(); //开始时间
                    oTimeLine[name] = setInterval( ()=>{
                        var timeChange = new Date().getTime(),
                            second     = opt.cycle * 1000,
                            scale      = 1 - Math.max(0,timeStart - timeChange + second) / second;
                        // console.log( scale );
                        //计时结束停止执行
                        if( scale >= 1 ){
                            opt.resolveFn && opt.resolveFn(oTimeLine,opt);
                            // 判断是要循环还是要停止
                            if( cyclenumber == 0 && oTimeLine[name] ){
                                _timerMethod(0);
                            }else{
                                clearInterval( oTimeLine[name] );
                                oTimeLine[name] = undefined;
                            };
                        };
                    },timeCycle);
                };
                // 安装定时器
                if( opt.status === 'install' ){
                    _timerMethod();
                };
                // 循环定时器
                if( opt.status === 'inter' ){
                    _timerMethod(0);
                };

                return this;
            },
            // 延期时间 单位毫秒
            delay(){

                return this;
            },
            // 暂停计时器的方法
            stop(){
                if( oTimeLine[clearname] ){
                    clearInterval( oTimeLine[clearname] );
                };
                return this;
            },
            // 开启定时器的方法
            start(){
                // this.create().call(oTimer);
                return this;
            }
        };

        return oTimer;

        //开始执行方法
        // function startTimeLine(){
        //     for (var x in oTimeLine) {
        //         if( !!oTimeLine[opt.name] ){
        //             oTimeLine[x]();
        //         };
        //     };
        // };
    },
    //给对象设置属性或数据
    // @param n {names||keys} : 字符串格式的对象链
    // @param v {value} : 值
    // @param s {source||{}} : 源对象
    setData(obj,v="",s={}){
        if( typeof obj === 'string' ){
            var n = obj;
            // 如果n参数没有则不往下执行
            if( !n || typeof n!=='string' ) return false;

            var oLength = (/[\.]+/gi.test(n))?n.split('.'):[n],
                source = s;

            for( let i=0; i<oLength.length; i++ ){
                let item = oLength[i];
                if( i == oLength.length-1 ){
                    source[item] = v;
                    // console.log('true -- setData条件: ', n, s);
                }else{
                    source = source[item];
                    // console.log('false -- setData条件: ', n, s);
                };
            };

            return false;
        };


        var opt = {
            okey: "",
            oval: null,
            oSource: {}
        };
        for (let i in obj) opt[i] = obj[i];
        if (!opt.okey || typeof opt.okey !== 'string') return false;

        var obj = opt.oSource;
        // 如果有 . 说明是连续对象型
        if( /[\.]/gi.test(opt.okey) ){
            opt.okey = opt.okey.split(".");
            for (let i = 0; i < opt.okey.length; i++) {
                if (i == opt.okey.length - 1) {
                    obj[opt.okey[i]] = opt.oval;
                } else {
                    obj = obj[opt.okey[i]];
                };
            };
            // console.log('setData条件: ', 1);
        }
        // 指定对象
        else{
            obj[opt.okey] = opt.oval;
            // console.log('setData条件: ', 2, obj);
        };
        // console.log('setData方法: ',opt.okey, obj[opt.okey]);
    },
    //日期计算
    iDate(time, diff = 0, style = 'yy-mm-dd') {    //time, diff, style,
        // 如果传入的是时间戳，必须是number类型，否则报错
        var d     = diff || 0;
        var timer = new Date(new Date(time).getTime() + d * (1000 * 60 * 60 * 24));
        
        var date  = new Date(new Date(time).setHours(0,0,0,0) + d * (1000 * 60 * 60 * 24));  //.getTime()
        // var dateTime = new Date(new Date(time) + d * (1000 * 60 * 60 * 24));
        var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        var db = {
            //年月日
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            mm: ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1),
            d: date.getDate(),
            dd: (date.getDate() < 10 ? '0' : '') + date.getDate(),

            //时间
            _h: timer.getHours(),
            _hh: (timer.getHours() < 10 ? '0' : '') + timer.getHours(),
            _m: timer.getMinutes(),
            _mm: (timer.getMinutes() < 10 ? '0' : '') + timer.getMinutes(),
            _s: timer.getSeconds(),
            _ss: (timer.getSeconds() < 10 ? '0' : '') + timer.getSeconds(),

            lastDay: '',
            w: weekDay[date.getDay()],
            timeInit : date.getTime(),   //设置时间初始化0点 setHours(0,0,0,0)
            todayDes:'',   //今天 明天 后天
            time: timer.getTime(),
            string: '',
            oDate:date   //日期对象 (重置时间0之后)
        }
        // console.log( db.time-new Date(new Date(time).getTime()).setHours(0,0,0,0) );
        // console.log( new Date(new Date(time).getTime()).setHours(0,0,0,0)+2 * (1000 * 60 * 60 * 24) );

        if (db.m + 1 > 12) {
            var nextMonthDay1 = new Date((db.y + 1) + '/01/1');
        } else {
            var nextMonthDay1 = new Date(db.y + '/' + (db.m + 1) + '/1');
        }

        // 本月末 = 下月初1-1000毫秒
        db.lastDay = (new Date(nextMonthDay1.getTime() - 1000)).getDate();
        if (style && style.indexOf('yy/mm/dd') > -1) {
            db.string = db.y + '/' + db.mm + '/' + db.dd
        } else if (style && style.indexOf('yymmdd') > -1) {
            db.string = db.y + '' + db.mm + '' + db.dd
        } else if (style && style.indexOf('yy-mm-dd') > -1) {
            db.string = db.y + '-' + db.mm + '-' + db.dd;
        } else {
            db.string = db.y + '-' + db.mm + '-' + db.dd;
        }
        if (style && style.indexOf('hh:mm:ss') > -1) {
            db.string += ' ' + db._hh + ':' + db._mm + ':' + db._ss;
        }

        //今天明天后天的描述
        switch( ( date - new Date().setHours(0,0,0,0) ) / 86400000 ){
            case 0 :
                db.todayDes = "今天";
            break;
            case 1 :
                db.todayDes = "明天";
            break;
            case 2 :
                db.todayDes = "后天";
            break;
            default : 
                db.todayDes = db.w;
        };

        //设置时间为空
        // db.timeInit = date.setHours(0,0,0,0);

        return db;
    },
    //是否是闰年
    isLeapYear(date){
        var _y = tools.iDate(date).y;
        return (0==_y%4&&((_y%100!=0)||(_y%400==0))); 
    },
    //快排算法
    sortMethods(){
        //数组对象排序、快排、简单实现
        var SortQuicklySimple = (arr,field)=>{
            //如果数组只有1位 那么直接返回
            if(arr.length<=1) return arr;
            
            var pivotIndex = Math.floor(arr.length/2),  //中心位置
                pivot = arr.splice(pivotIndex,1)[0],    //中心位置的元素
                _left = [],
                _right = [];
            for( let i=0,len=arr.length; i<len; i++ ){
                var elem = arr[i];
                // console.log( elem,elem[field], pivot[field] );
                var condition = !!field?(elem[field]<pivot[field]):(elem<pivot);
                // if( !elem[field] ) return false;
                if( condition ){
                    _left.push(arr[i]);
                }else{
                    _right.push(arr[i]);
                };
            };
            return SortQuicklySimple(_left).concat([pivot],SortQuicklySimple(_right));
        };
        //选择排序
        var SortSelection = (myArray,field)=>{
            //定义一个交换函数
            function swap(myArray, p1, p2){
                var temp = myArray[p1];
                myArray[p1] = myArray[p2];
                myArray[p2] = temp;
            };
            //定义主方法 并且返回
            var len = myArray.length,
                min;
            for (let i=0; i < len; i++){
                // 将当前位置设为最小值
                min = i;
                // 检查数组其余部分是否更小
                for (let j=i+1; j < len; j++){
                    //条件 field有值的时候则是数组对象
                    var condition = !!field?(myArray[j][field]<myArray[min][field]):(myArray[j]<myArray[min]);
                    if (myArray[j][field] < myArray[min][field]){
                        min = j;
                    };
                };
                // 如果当前位置不是最小值，将其换为最小值
                if (i != min){
                    swap(myArray, i, min);
                };
            };
            return myArray;
        };

        return{
            SortQuicklySimple,
            SortSelection
        };
    },
    //修剪标记
    trimTag(obj,str){
        var regexpStr = RegExp(str,"g");
        var values = obj.replace(regexpStr,"");
        // console.log(values);
        return values;
    },
    //设置页面title文案
    setTitle(oText){
        utils.$$("title").innerText = oText;
    },
    //小于10补0
    addZreo(num){
        if(typeof num === 'number' && num < 10){
            return '0' + num;
        }else{
            return num;
        }
    },
    /**
     *
     * 对象拷贝
     * p {parent object} 父对象
     * c {child object} 子对象
     *
    */
    oClone(p,c){
        var c = c || {};
        for( var x in p ){
            if( typeof p[x] === 'object' ){
                // 如果是对象则创建对象 ：是数组就创建数组
                c[x] = ( tools.utilityType.isObj(p[x]) )?{}:[];
                tools.oClone(p[x],c[x]);
            }else{
                c[x] = p[x];
            };
        };
        return c;
    },
    // loading加载
    loadMethods(arr,page){
        var oImg = new Image();
        oImg.onload = ()=>{
            page ++;
            // 加载完成
            if( page >= arr.length ){
                
                page = 0;
            }else{
                tools.loadMethods(arr,page);
            };
        };
        oImg.src = arr[page];
    },
    /**
    * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
    * 窗口调整（resize）、页面滚动（scroll）、抢购疯狂点击（mousedown）
    * @param fn {function}  需要调用的函数
    * @param delay  {number}    延迟时间，单位毫秒
    * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
    * @return {function}实际调用函数
    */
    ScriptThrottle(fn, delay, immediate, debounce) {
        var curr = +new Date(), //当前事件
            last_call = 0,
            last_exec = 0,
            timer = null,
            diff, //时间差
            context, //上下文
            args,
            exec = function() {
                last_exec = curr;
                fn.apply(context, args);
            };

        return function() {
            curr = +new Date();
            context = this,
            args = arguments,
            diff = curr - (debounce ? last_call : last_exec) - delay;
            clearTimeout(timer);
            if (debounce) {
                if (immediate) {
                    timer = setTimeout(exec, delay);
                } else if (diff >= 0) {
                    exec();
                };
            } else {
                if (diff >= 0) {
                    exec();
                } else if (immediate) {
                    timer = setTimeout(exec, -diff);
                };
            };
            last_call = curr;
        };
    },
    /**
    * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
    * 实时搜索（keyup|keyInput）、拖拽（mousemove）
    * @param fn {function}  要调用的函数
    * @param delay   {number}    空闲时间
    * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
    * @return {function}实际调用函数
    */
    ScriptDebounce(fn, delay=500, immediate=true) {
       return tools.ScriptThrottle(fn, delay, immediate, true);
    }
};


//一些工具类方法
function utilsTool(){
    //获取元素的ID或CLASS
    var $$ = (ID) => {
        return document.querySelector(ID);
    };
    //获取宽度
    var win = () => {
        var winWidth = 0,
            winHeight = 0
        //获取窗口宽度
        if (window.innerWidth){
            winWidth = window.innerWidth;
        }else if ((document.body) && (document.body.clientWidth)){
            winWidth = document.body.clientWidth;
        };
        //获取窗口高度
        if (window.innerHeight){
            winHeight = window.innerHeight;
        }else if ((document.body) && (document.body.clientHeight)){
            winHeight = document.body.clientHeight;
        };
        //通过深入Document内部对body进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            winHeight = document.documentElement.clientHeight;
            winWidth = document.documentElement.clientWidth;
        };
        //结果输出至两个文本框
        // console.log(winWidth, winHeight);
        return {
            width : winWidth,
            height : winHeight
        };
    };
    //设备的判断检测
    var intelligentAuxiliary = {
        oMobile: /iphone|ipod|ipad|android|newsmy|blackberry|opera|mini|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()), //判断是不是移动端
        orientationJson: {},  //移动端翻转设备时的json队列
        // 定时器事件对象
        timelineObject : {},  //时间对象队列管理
        // 设计稿对象、适配类型方案 oAdapt管理对象
        designInfo     : {
            design: {w:750,h:1334},
            mode  : 'transverse'
        }
    };
    //加载等待组件
    // var indicatorLoading = (obj)=> {
    //     return {
    //         timer : undefined,
    //         Indicator : Indicator,
    //         // 执行了Close()方法时 不再计算超时时间 并立刻关闭
    //         close(){
    //             this.Indicator.close();
    //             clearTimeout(this.timer);
    //             this.timer = null;
    //             this.Indicator = null;
    //         },
    //         open(){
    //             // 设置超时时间
    //             Indicator.open(obj);
    //             obj.timeout = obj.timeout || 10000;
    //             // 已存在定时器就清除 放抖动
    //             if (!!this.timer) clearTimeout(this.timer);
    //             // 超时后清除和关闭loading
    //             this.timer = setTimeout(() => {
    //                 this.close();
    //             }, obj.timeout);
    //         }
    //     };
    //     // var timer = null;

    //     // //执行了Indicator.close方法时 就不在计算超时时间
    //     // if( !!obj.close ){
    //     //     Indicator.close();
    //     //     clearTimeout(timer);
    //     //     timer = null;
    //     //     return false;
    //     // };

    //     // Indicator.open(obj);
    //     // obj.timeout = obj.timeout || 10000;
    //     // if(!timer){
    //     //     clearTimeout(timer);
    //     // };
    //     // timer = setTimeout(()=>{
    //     //     Indicator.close();
    //     //     timer = null;
    //     // },obj.timeout);
    // };
    //精确校验类型
    var gettype = Object.prototype.toString;
    var utilityType = {
        isObj: function(o) {
            return gettype.call(o) == "[object Object]";
        },
        isArray: function(o) {
            return gettype.call(o) == "[object Array]";
        },
        isNULL: function(o) {
            return gettype.call(o) == "[object Null]";
        },
        isDocument: function() {
            return gettype.call(o) == "[object Document]" || "[object HTMLDocument]";
        }
    };
    //校验对象是否为空
    var isEmptyObject = (o,t='Object')=>{
        if(t==='Object'){
            for(let i in o){
                return true;
            };
        }else if(t==='Array'){
            for(let i=0,len=o.length; i<len; i++){
                if( !!o[i] ){
                    return true;
                    break;
                };
            };
        }
        return false;
    };
    //校验对象有几个
    var isObjectNo = (o,t='TrueNo')=>{
        var num = 0;
        for( let i=0; i<o.length; i++ ){
            if( t === 'TrueNo' ){
                if( !!o[i] ){
                    num++;
                };
            }else if( t === 'FalseNo' ){
                if( !o[i] ){
                    num++;
                };
            }
        };
        return num;
    };
    //真||假的条件判断
    var isConform = (sta)=>{
        // if( !!sta ){
        //     resolve && resolve();
        // }else{
        //     reject && reject();
        // };
        return new Promise((resolve, reject) => {
            if( !!sta ){
                resolve(true);
            }else{
                reject(false);
            };
        });
    };
    //遍历字符串并查找对象
    var searchObjects = (oSource,strUrl)=>{
        // var oResult = oSource;
        for (let i=0,len=strUrl.length; i<len; i++) {
            oSource = oSource[strUrl[i]];
        };
        return oSource;
    };
    //重置对象的值为空
    var resetObjectValue = (keys) => {
        for(var x in keys){
            keys[x] = "";
        };
    };
    //本地缓存
    var Storage = {
        get(name){  //,type=false
            if( localStorage.getItem(name) ){
                return JSON.parse(localStorage.getItem(name));  //JSON.parse 格式化数据
            }else{
                return null;
            };
            // //等于false的时候格式化
            // if(!!type){
            //     return localStorage.getItem(name);
            // }else{
            //     //主动 JSON.parse 格式化
            //     try{
            //         return JSON.parse(localStorage.getItem(name));
            //     }catch(e){
            //         console.log(e);
            //     }
            // };
        },
        set(name,data){
            return localStorage.setItem(name,JSON.stringify(data));
        },
        remove(name){
            return localStorage.removeItem(name);
        },
        clear : localStorage.clear
    };
    //数组 || 对象 去重的方法 
    var objectDuplicate = ( obj ) => {
        return {
            // 去重方法 利用ES6 new set()
            removal(){
                var oSet = new Set(),   //创意建一个Set() 构造函数，用来生成 Set 数据结构
                    oResult = [];
                //对象存在时才执行去重方法
                if( !!obj ){    //Storage.get(name,1)
                    [].forEach.call( obj,(elem,index) => {
                        var type = JSON.stringify(elem);
                        oSet.add(type);
                    });
                    //输出对象
                    for(let x of oSet){
                        oResult.push(JSON.parse(x));
                    };
                };
                return oResult;
            },
            // 是否有重复的数据
            hasRepeat(thisdata){
                var stringData = JSON.stringify(obj),
                    thisDataStr = JSON.stringify(thisdata);

                if( stringData.indexOf(thisDataStr) == -1 ){
                    return false;
                }else{
                    return true;
                };
            }
        };
        
    };

    //适配算法
    var adaptation = (obj,mode)=>{
        // 设计比例
        var design = intelligentAuxiliary.designInfo.design,
            type = intelligentAuxiliary.designInfo.mode;
        // 换算类型 
        var formula = ()=>{
            var _MODETYPE = mode || type;
            // transverse ：横向； vertical ：竖向
            return type===_MODETYPE?
                  (win().width/design.w):
                  (
                    (design.w/design.h)<(win().width/win().height)?
                        (design.w/design.h)*win().height:
                        win().width
                  )/design.w;
        };

        //如果参数是对象
        if( utilityType.isObj(obj) ){
            var opts = {
                name : 'objAdaptationMethods',
                px : 0,
                design : design,
                fn(){}
            }; for(let x in obj) opts[x]=obj[x];

            // 手机翻转时
            var timeline = null;
            tools.orientationFunc(name,()=>{
                clearTimeout(timeline);
                timeline = setTimeout(()=>{
                    opts.fn(formula()*opts.px);
                    timeline = null;
                },300);
            });
            opts.fn(formula()*opts.px);

        }else if( typeof obj === 'number' ){
            return formula()*obj;
        };
    };
    // var adaptation = (obj) => {
    //     var opts = {
    //         design : 750,
    //         pixel : 0,
    //         mode : 'transverse',    // transverse：横向；vertical：竖向
    //         fn(){}
    //     };
    //     for( let x in obj ) opts[x] = obj[x];

    //     // var [pixel = 0,mode,fn] = obj;
    //     var _formula = ()=>{
    //         return opts.mode === 'transverse' ?
    //         (win().width/opts.design)*opts.pixel:
    //         (win().width/opts.design)*opts.pixel;
    //     };
    //     //手机逻辑尺寸变化时
    //     tools.orientationFunc('adaptationMethod',()=>{
    //         opts.fn( _formula() );
    //         return _formula();
    //     });
    //     opts.fn( _formula() );
    //     return _formula();
    // };



    return {
        $$ : $$,
        win : win,
        Storage : Storage,
        adaptation : adaptation,
        // indicatorLoading : indicatorLoading,
        intelligentAuxiliary : intelligentAuxiliary,
        utilityType : utilityType,
        isEmptyObject : isEmptyObject,
        isObjectNo : isObjectNo,
        isConform : isConform,
        searchObjects : searchObjects,
        resetObjectValue : resetObjectValue,
        objectDuplicate : objectDuplicate
    };
};

// function toolsMethod(){
//     class Tool{
//         constructor(){

//         }
//         // 返回rem值
//         rem(px){

//         }
//     }
// };

// 封装一系列的工具、方法、对象接口···
class UtilsTool {
    constructor(){
        this.oAuxiliary = {
            'orientationObject':{},
            'oAdapt': {
                'design': {w:750, h:1334},
                'mode'  : 'transverse'
            }
        };
        var gettype = Object.prototype.toString;
        this.vetifyType = {
            isObj: o => gettype.call(o) == "[object Object]",
            isArray: o => gettype.call(o) == "[object Array]",
            isNULL: o => gettype.call(o) == "[object Null]",
            isDocument: () => gettype.call(o) == "[object Document]" || "[object HTMLDocument]"
        }
    }
    // 算法换算适配器
    oAdapt(obj,mode){
        // 设计比例
        var design = this.oAuxiliary.oAdapt.design,
            type = this.oAuxiliary.oAdapt.mode;
        // 换算类型 
        var formula = ()=>{
            var _MODETYPE = mode || type;
            // transverse ：横向； vertical ：竖向
            return type===_MODETYPE?
                  (this.oWinSize().width/design.w):
                  (
                    (design.w/design.h)<(this.oWinSize().width/this.oWinSize().height)?
                        (design.w/design.h)*this.oWinSize().height:
                        this.oWinSize().width
                  )/design.w;
        };

        //如果参数是对象
        if( this.vetifyType.isObj(obj) ){
            var opts = {
                name : 'objAdaptationMethods',
                px : 0,
                design : design,
                fn(){}
            }; for(let x in obj) opts[x]=obj[x];

            // 手机翻转时
            var timeline = null;
            this.setOrientation(name,()=>{
                if( timeline ) clearTimeout(timeline);
                timeline = setTimeout(()=>{
                    opts.fn(formula()*opts.px);
                    timeline = null;
                },300);
            });
            opts.fn(formula()*opts.px);

        }else if( typeof obj === 'number' ){
            return formula()*obj;
        };
    }
    // 窗口尺寸
    oWinSize(){
        var winWidth = 0,
            winHeight = 0
        //获取窗口宽度
        if (window.innerWidth){
            winWidth = window.innerWidth;
        }else if ((document.body) && (document.body.clientWidth)){
            winWidth = document.body.clientWidth;
        };
        //获取窗口高度
        if (window.innerHeight){
            winHeight = window.innerHeight;
        }else if ((document.body) && (document.body.clientHeight)){
            winHeight = document.body.clientHeight;
        };
        //通过深入Document内部对body进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            winHeight = document.documentElement.clientHeight;
            winWidth = document.documentElement.clientWidth;
        };
        //结果输出至两个文本框
        // console.log(winWidth, winHeight);
        return {
            width : winWidth,
            height : winHeight
        };
    }
    //主要用于移动端翻转设备时的处理
    setOrientation(name,fn){  
        var timer = "",
            obj = this.oAuxiliary.orientationObject;

        obj[name] = fn;
        if (typeof window.onorientationchange == "undefined") {
            window.onresize = function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    for (var x in obj) {
                        obj[x]();
                    };
                }, 100);
            };
        } else {
            window.onorientationchange = function() {
                if (window.orientation == 0 || window.orientation == 180 || window.orientation == 90 || window.orientation == -90) {
                    for (var x in obj) {
                        obj[x](window.orientation);
                    };
                };
            };
        };
    }
    // 给对象constructor中的对象 设置属性或数据
    // @param n {names||keys} : 字符串格式的对象链
    // @param v {value} : 值
    // @param s {source||{}} : 源对象
    setData(n = "", v = "", s = this.oAuxiliary) {
        // 如果n参数没有则不往下执行
        if (!n || typeof n !== 'string') return false;

        var oLength = (/[\.]+/gi.test(n)) ? n.split('.') : [n],
            source = s;

        for (let i = 0; i < oLength.length; i++) {
            let item = oLength[i];
            if (i == oLength.length - 1) {
                source[item] = v;

                // console.log('true -- setData条件: ', n, s);
            } else {
                source = source[item];

                // console.log('false -- setData条件: ', n, s);
            };
        };
        // console.log('source:',s,source);
    }
    // dom选取元素
    query($){
        var o = document.querySelectorAll($);
        if( !o.length ){
            return '';
        }else if( o.length == 1 ){
            return document.querySelector($);
        };
        return o;
    }
    // 合并对象
    merge(target){
        for (let i = 1, j = arguments.length; i < j; i++) {
            let source = arguments[i] || {};
            for (let x in source) {
                if (source.hasOwnProperty(x)) {
                    var value = source[x];
                    if (value !== undefined) {
                        target[x] = value;
                    }
                }
            }
        }
        return target;
    }
};


export default new UtilsTool();

// 'Tool': new UtilsTool(),
// install(Vue){
//     Vue.Tool = tools;

//     //直接在Vue对象上定义新的属性或修改现有属性 并返回该对象
//     Object.defineProperties(Vue.prototype,{
//         $Tool : {
//             value : Vue.Tool,
//             writable : false
//         }
//     });
//     // Object.defineProperties(Vue.prototype, {
//     //     $Tool: {
//     //         get: function() {
//     //             return Vue.Tool
//     //         }
//     //     }
//     // });
// }

// function isScroller(el) {
//     // 判断元素是否为 scroller
//     return el.classList.contains('seatSelectionStageWrap');
// };
// Vue.Tool.query(".seatSelectionStageWrap").addEventListener('touchmove', function(ev) {
//     var target = ev.currentTarget;  //ev.target;
//     // console.log( ev.currentTarget.classList.contains('seatSelectionStageWrap') );
//     // 在 seatSelectionStageWrap 上滑动，阻止事件冒泡，启用浏览器默认行为。
//     if (isScroller(target)) {
//         ev.stopPropagation();
//         ev.preventDefault();
//     };
// }, true);