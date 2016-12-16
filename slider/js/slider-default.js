// 轮播-1

(function(fn){
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = fn();
    }else{
        fn();
    }
})(function(){
    $.fn.slider = function(opts){

        // 默认参数
        var defaults = { 
                sliderList : $('.slider-list'),  //list 容器
                sliderItem : $('.slider-item'),  //listitem
                pre : $('.slider-pre'),                  //上一个
                next : $('.slider-next'),                //下一个
                marginLeft : 0,                                  //item之间的间隙
                moveGap : 2000,                                  // 运动的间隙 ms
                moveDuration : 1,                            // 运动的时间 s
                sliderNav : $('.slider-nav li'),  // 图片导航
                isAutoPlay:true,  // 是否自动播放
                itemNbr:1
        }

        var options = $.extend({}, defaults, opts); // 合并参数

        // 参数赋值
        var $sliderList = options.sliderList;
        var $sliderItem = options.sliderItem;
        var $pre = options.pre;
        var $next = options.next;
        var $sliderNav = options.sliderNav;
        var moveGap = options.moveGap;
        var moveDuration = options.moveDuration;
        var timer = ''; // 计时器
        // var totalPage = 3; 
        // var curPage = 1;
        var itemNbr = options.itemNbr; //一屏有几个元素
        var marginLeft = parseInt($sliderItem.eq(0).css('margin-right')); // 元素与元素之间的距离
        var itemWidth = $sliderItem.width() + marginLeft; // 一个元素的宽度+margin
        var len = $sliderItem.length; //原始列表长度
        var OFFSET = ''; // 常量 一屏的宽度
        var nowMarginLeft = OFFSET = -(itemWidth * itemNbr);
        var index = 0; //第一屏
        var MAX_INDEX = len/itemNbr-1; //共几屏幕

        var firstWindowHtml = ''; // 第一屏的html
        var lastWindowHtml = '';  // 最后一屏的html        
        for(var i = 0; i < itemNbr; i++){
            firstWindowHtml += $sliderItem[i].outerHTML;
            lastWindowHtml += $sliderItem[len - i - 1].outerHTML;
        }     

        init();

        return this.each(function(){

                // 点击 切换
                $pre.click(function(event) {
                    if($sliderList.is(':animated')){
                        return false;
                    }
                // offset =  (itemWidth)*itemNbr;
                    animate(-OFFSET);
                    index --;
                    options.preNextCallBack($(this), index);
                });

                $next.click(function(event) {
                    if($sliderList.is(':animated')){
                        return false;
                    }
                // offset =  -offset;
                    animate(OFFSET);
                    index ++;
                    options.preNextCallBack($(this), index);
                });

                // hover 不滑动
                $sliderList.hover(function(){
                        clearTimeout(timer);
                    }, function(){
                        play();
                    });

                // 点击nav导航
                $sliderNav.click(function(){
                    var i = $(this).index();
                    var curIndex = index;
                    index = i;
                    animate( (i - curIndex) * OFFSET );
                });
        });


        function init(){

                $sliderList.append(firstWindowHtml);
                $sliderList.prepend(lastWindowHtml);
                // len = len + $(firstWindowHtml).length + $(lastWindowHtml).length; // 重新获取len的长度

                // 显示第一屏
                reset(index);

                // 设置list长度
                var sliderWidth = (itemWidth) * (len + itemNbr*2);
                $sliderList.css({
                    'width': sliderWidth
                });

                // 自动轮播
                play()

                options.callBack(index);
        }


        // 移动一屏幕
        function animate(offset){
            
            nowMarginLeft = nowMarginLeft + offset;
            // 判断是否支持 transition属性
            if('transition' in document.documentElement.style || 'webkitTransition' in document.documentElement.style || 'msTansition' in document.documentElement.style || 'oTransition' in document.documentElement.style){
                $sliderList.css({
                    'transform': 'translate3D(' + nowMarginLeft + 'px, 0, 0)',
                    'transition' :'transform '+ moveDuration + 's ease-in 0s'
                })
                setTimeout(function(){
                    reset(index);
                }, moveDuration*1000);
                
            }else{
                $sliderList.animate({
                'margin-left': nowMarginLeft
                }, moveDuration, function(){
              reset(index);
            });
            }
        }   

        // 自动播放
        function play(){
            // 每两秒 自动滑动 一屏幕
            if(!options.isAutoPlay){ return;}
            animate(OFFSET);
            index ++ ;
            timer = setTimeout(function(){
                play();
            },moveGap);
        }

        // 参数重置
        function reset(id){
            if('transition' in document.documentElement.style || 'webkitTransition' in document.documentElement.style || 'msTansition' in document.documentElement.style || 'oTransition' in document.documentElement.style){
                if(id > MAX_INDEX){ // 如果最后一屏
                  nowMarginLeft = OFFSET;
                  $sliderList.css({
                    'transform':'translate3D(' + nowMarginLeft + 'px, 0, 0)',
                    'transition':''
                  });
                  // 'transform': 'translate3D(' + nowMarginLeft + 'px, 0, 0)',
                  index = 0;
                }
                if(id < 0){
                  nowMarginLeft = -(itemWidth)*(len);
                  $sliderList.css({
                    'transform':'translate3D(' + nowMarginLeft + 'px, 0, 0)',
                    'transition':''
                  });
                  index = MAX_INDEX;
                }
                // 默认第一屏幕
                if(id == 0){
                    $sliderList.css({
                        'transform':'translate3D(' + nowMarginLeft + 'px, 0, 0)',
                        'transition':''
                    });
                }
            }else{
                if(id > MAX_INDEX){ // 如果最后一屏
                  nowMarginLeft = OFFSET;
                  $sliderList.css('margin-left',nowMarginLeft);
                  index = 0;
                }
                if(id < 0){
                  nowMarginLeft = -(itemWidth)*(len);
                  $sliderList.css('margin-left', nowMarginLeft);
                  index = MAX_INDEX;
                }
                if(id == 0){
                    $sliderList.css('margin-left', nowMarginLeft);
                }
            }
            $sliderNav.siblings().removeClass('active').eq(index).addClass('active');
        }
    }
})

