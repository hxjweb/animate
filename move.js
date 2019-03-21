~function () {
    function linear(time,begin,change,duration) {
        return time/duration*change+begin;
    }
    /*
    实现多方位运动，且运动结束后可以执行一个回调函数的封装动画方法
     */
    function move(curEle,target,duration,callback) {
        window.clearInterval(curEle.timer);
        //根据target获取每个方向的起始值begin和总距离change
        var begin = {},change = {};
        for(var key in target){
            if(target.hasOwnProperty(key)){
                begin[key] = parseInt(getCss(curEle,key));
                change[key] = target[key]-begin[key];
            }
        }
        var time = 0;
        curEle.timer = window.setInterval(function () {
            time += 10;
            if(time >= duration){
                css(curEle,target);
                //动画结束后执行的回调函数,并且让回调函数中的this指向当前元素
                callback && callback.call(curEle);
                window.clearInterval(curEle.timer);
                return;
            }
            for(var key in target){
                if(target.hasOwnProperty(key)){
                    curEle.style[key] = linear(time,begin[key],change[key],duration)+'px';
                }
            }
        },10)
    }
    window.animationMove = move;
}()