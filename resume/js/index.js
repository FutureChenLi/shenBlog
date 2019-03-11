/*
 * @Description: 主js
 * @Author: shenxf
 * @Date: 2019-02-28 20:33:47
 */
$(function () {
    /*初始化fullpage组件*/
    /*1.设置每一个屏幕的背景颜色*/
    /*2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐*/
    /*3.设置导航 设置指示器 点容器*/
    /*4.监听进入某一屏的时候 回调*/
    $('.container').fullpage({
        /*配置参数*/
        sectionsColor: ["#86afa4", "#109085", "#4d5e8f", "#945c4c", "#4b85a0", "#a29971"],
        verticalCentered: false,
        navigation: true,
        afterLoad:function (link,index) {
            /*index 序号 1开始  当前屏的序号*/
            $('.section').eq(index-1).addClass('now');

            if (index == 6) {
                $('.arrow').hide();
            } else {
                $('.arrow').show();
            }
        },
        onLeave:function(index, nextIndex, direction) {

        },
        afterRender: function(){
           
        },
        /*页面切换的时间 默认是700*/
        scrollingSpeed:1000
    });

    // 经历选择
    $('.cut-list .item').on('click',function(){
        // 导航按钮变色
        console.log($(this).index());
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    // 经历版 立体效果
    $('.experience .banner').on('mousemove', function(){
        // "transform: rotateY(0deg) rotateX(0deg);"

    });
});