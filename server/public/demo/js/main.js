var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    mousewheelControl: true,
    nextButton:'.button-next',
    onInit: function (swiper) {
        swiperAnimate(swiper);
    },
    onSlideChangeEnd: function (swiper) {
        swiperAnimate(swiper);
    },
})

var addClass = function(ele, strClass) {
    var reg = new RegExp("(^| )" + strClass + "( |$)");
    if (reg.test(ele.className)) {
        //如果此类样式已经存在，则什么也不需要做
    } else { //不存在
        ele.className = ele.className.trim() + " " + strClass;
    }
};

var removeClass = function(ele, strClass) {
    if (!(ele && ele.nodeType == 1)) {
        throw new Error('第一参数ele需要是一个DOM元素对象');
    }
    if (typeof strClass != 'string') {
        throw new Error('第二参数必须为string类型');
    }
    var reg = new RegExp("(?:^| )" + strClass + "(?: |$)", "g");
    ele.className = ele.className.replace(reg, '').trim();
};

var autiobtn = document.getElementsByClassName('btn-music')[0];
var audio = document.getElementById('media');
var touchStatu = true;
document.addEventListener("touchstart", function(e) {
    if (touchStatu) {
        audio.play();
        addClass(autiobtn, 'rotate');
        touchStatu = false;
    }
}, false);

autiobtn.onclick = function() {
    if(audio!==null){
        if(audio.paused){
            audio.play();
            addClass(autiobtn, 'rotate');
        }else{
            audio.pause();
            removeClass(autiobtn, 'rotate');
        }
    }
}

audio.addEventListener("canplaythrough", function() {
    if(audio!==null){
        if(!audio.paused){
            addClass(autiobtn, 'rotate');
        } else {

        }
    }
});

var loader = (function () {
    var loadingContainer = document.getElementById('loadingCont')
    var loadingTxt = document.getElementById('loadingTxt')
    var loadingCircle = document.getElementById('loadingCircle')
    var loadingCircleP = loadingCircle.getAttribute('stroke-dasharray')
    var imgs = document.getElementsByTagName('img')
    var srcList = []
    var imgList = []
    var imgSrc, i
    for (i = 0; i < imgs.length; i++) {
        imgSrc = imgs[i].getAttribute('pre-src')
        if (imgSrc) {
            srcList.push(imgSrc)
            imgList.push(imgs[i])
        }
    }
    if (srcList.length === 0) {
        swiper.container[0].style.opacity = 1
        loadingContainer.style.opacity = 0
        swiperAnimate(swiper)
    }
    return new resLoader({
        resources: srcList,
        onStart: function (total) {
            // 开始加载资源
        },
        onProgress: function (current, total) {
            // 加载资源数量
            var p = current / total
            loadingTxt.textContent = Math.round(p * 100) + '%'
            loadingCircle.style.strokeDashoffset = (1 - p) * loadingCircleP
        },
        onComplete: function (total) {
            console.log('加载完毕:' + total + '个资源')
            for (i = 0; i < imgList.length; i++) {
                imgList[i].setAttribute('src', srcList[i])
            }
            swiper.container[0].style.opacity = 1
            loadingContainer.style.opacity = 0
            swiperAnimate(swiper)
        }
    })
})()
loader.start()
