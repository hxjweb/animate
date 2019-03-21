/*
获取元素的某一个样式
如果可以去单位则去单位
处理了opacity兼容
 */
function getCss(curEle,attr) {
    var val = null,
        reg = null;
    if(window.getComputedStyle){
        val =  window.getComputedStyle(curEle,null)[attr];
    }else{
        if(attr === 'opacity'){
            val = curEle.currentStyle['filter'];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
        }else{
            val =  curEle.currentStyle[attr];
        }
    }
    reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)$/i;
    return reg.test(val) ? parseFloat(val) : val;
}
/*
给元素设置样式
如果value加单位了则无需处理，但是如果没加单位则需要加上单位px
 */
function setCss(curEle,attr,value) {
    if(attr === 'opacity'){
        curEle.style['opacity'] = value;
        curEle.style['filtre'] = 'alpha(opacity="+value*100+")';
        return;
    }
    if(attr === 'float'){
        curEle.style['cssFloat'] = value;
        curEle.style['styleFloat'] = value;
        return;
    }
    var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Right|Bottom|Left)?))$/;
    if(reg.test(attr)){
        if(!isNaN(value)){
            value += 'px';
        }
    }
    curEle.style[attr] = value;
}
function setCssGroup(curEle,options) {
    options = options || 0;
    if(options.toString() !== '[object Object]'){
        return;
    }
    for(var key in options){
        if(options.hasOwnProperty(key)){
            setCss(curEle,key,options[key]);
        }
    }
}
/*
实现样式的获取，设置和批量设置
 */
function css(curEle) {
    var argTwo = arguments[1];
    if(typeof argTwo === 'string'){
        var argThree = arguments[2];
        //第二个参数使字符串且没有第三个参数，则是获取样式
        if(!argThree){
            return getCss.apply(this,arguments);
            //return getCss(curEle,argTwo);
        }
        //如果由第三个参数则是设置样式
        setCss.apply(this,arguments);
    }
    argTwo = argTwo || 0;
    if(argTwo.toString() === '[object Object]'){
        setCssGroup.apply(this,arguments);
    }
}