;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));
/* ==================================================
<| $(document).ready
================================================== */
window.addEventListener('load', function(){
    var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheelControl: true,
    });
    var startScroll, touchStart, touchCurrent;
    swiper.slides.on('touchstart', function (e) {
        startScroll = this.scrollTop;
        touchStart = e.targetTouches[0].pageY;
    }, true);
    swiper.slides.on('touchmove', function (e) {
        touchCurrent = e.targetTouches[0].pageY;
        var touchesDiff = touchCurrent - touchStart;
        var slide = this;
        var onlyScrolling = 
                ( slide.scrollHeight > slide.offsetHeight ) && //allow only when slide is scrollable
                (
                    ( touchesDiff < 0 && startScroll === 0 ) || //start from top edge to scroll bottom
                    ( touchesDiff > 0 && startScroll === ( slide.scrollHeight - slide.offsetHeight ) ) || //start from bottom edge to scroll top
                    ( startScroll > 0 && startScroll < ( slide.scrollHeight - slide.offsetHeight ) ) //start from the middle
                );
        if (onlyScrolling) {
            e.stopPropagation();
        }
    }, true);
    // 横屏监听
    var updateOrientation = function(){
    if(window.orientation=='-90' || window.orientation=='90'){
        console.log('为了更好的体验，请将手机/平板竖过来！');      
    };
    }
    window.onorientationchange = updateOrientation;
});
/* ==================================================
<| $(document).ready
================================================== */
$(document).ready(function() {
	initializePageProduct();
});
/* ==================================================
<| initializePageProduct
================================================== */
function initializePageProduct() {
	/* yearlist */
	var yearlist = $(".m-product").find(".yearlist");
	var menu = yearlist.find(".menu").find(".options");
	var list = ["2017", "2016", "2015", "2002"];
	initializeMenu(menu, list);
}
/* ==================================================
<| initializeMenu
================================================== */
function initializeMenu(menu, list) {
	list.forEach(function(value) {
		var option = $("<p></p>").text(value);
		menu.append(option);
	});
	var options = menu.find("p");
	var option = options.first();
	option = $(options[1]);
	option.addClass("active");
}
var width_a = $(window).width() + "px";
$(".window li img").css("width",width_a);

var first_pic = $(".window li").first().clone();
var size = 2;
var toleft = $(".window li img").width();
var win_width = size*toleft + "px";
var left;

$(".window").css("width",win_width);

var key = 0;
var timer = setInterval(autoplay,1000);

function autoplay(){
	key++;
	if (key>size-1) {
		$(".window").stop().css("margin-left","0px");
		key = 0;
	}
	else{
		left = -1*key*toleft + "px";
		$(".window").animate({marginLeft:left},1000);
	}
}

//获取每次img的src储存到数组中
function Download(){
	var srcArray = new Array();
	var i = 0;
	$(".picc").each(function(){
		srcArray[i] = $(this)[0].src;
		i++;
	});
}

Download();

$.ajax({
	type:'POST',
	url:'api/index.php?name=download',
	success:function(data){
		data = JSON.parse(data);
		//每次获取到url的时候新建一个图片
		var len = data.length;
		for(var i=0;i<len;i++){
			var new_img = '<li><img src="'+data[i]+'"></li>';
			$(".window").append(new_img);
			size++;
			$(".window").width(size*toleft);
		}
		$(".window").append(first_pic);
		var width_a = $(window).width() + "px";
		$(".window li img").css("width",width_a);
	},
})
/* ==================================================
<| $(document).ready
================================================== */
window.addEventListener('load', function() {//$(document).ready(function() {
	initializePageTitle();
})
/* ==================================================
<| initializePageTitle
================================================== */
function initializePageTitle() {
	/* no scrolling */
	swiper.disableMousewheelControl();
	//swiper.disableKeyboardControl();
	/* fingerprinting args */
	var timer = 0;
	var printing;
	var button = $(".m-title").find(".mark");
	/* if keep printing */
	button.mousedown(function() { /* mousedown对电脑网页正常，手机页面有奇怪的效果(?) */
		/* set timer */
		printing = setInterval(function() {
			timer ++;
			if (timer == 2) {
				/* clear timer */
				timer = 0;
				clearInterval(printing);
				/* show icon */
				$(".m-title").find(".dp").fadeOut(1000);
				$(".m-title").find(".fingerprint").find("img").fadeIn(1000);
				/* and swip to the next page */
				setTimeout(function() {
					swiper.slideNext(false);
				}, 2000);
				/* allow to scroll */
				swiper.enableMousewheelControl();
				//swiper.enableKeyboardControl();
			}
		}, 500);
	});
	/* if not keep printing */
	button.mouseup(function() {
		/* clear timer */
		timer = 0;
		clearInterval(printing);
	});
}
/*var time=0;
var p1=document.getElementById("P1");
p1.addEventListener("touch",function(){
	var i=setInterval(function(){
		time++;
		if(time==2){
			clearInterval(i);
			p1.hide();
		}
	},true)
})*/

/*var p1=document.getElementById("P1");
p1.addEventListener("click",function(){
	console.log("111");
});
*/

var mousePressed = false;
var lastX, lastY;
var ctx;
var canvas_width = $(window).width();
var canvas_height = "250px";

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 9;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");
    var pic0 = document.getElementById('myCanvas');
    pic0.width = canvas_width;
    pic0.height = 250;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas_width, 250);

    var $canvas = $('#myCanvas');
    $canvas[0].addEventListener('touchstart', function(e){
        mousePressed = true;
        e = e.touches[0];
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    });
    $canvas[0].addEventListener('touchmove', function(e){
        if (mousePressed) {
            e = e.touches[0];
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });
    $canvas[0].addEventListener('touchend', function(){
        mousePressed = false;
    });
    $canvas.mouseup(function (e) {
        mousePressed = false;
    });
        $canvas.mouseleave(function (e) {
        mousePressed = false;
    });
}

//清空画板
function clearBoard() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas_width,250);
}

function UploadPic() {
    var Pic = document.getElementById("myCanvas").toDataURL("image/png", 0.5);
    $.ajax({
        type: 'POST',
        url: './api/index.php?name=upload',
        data: { 'data': Pic },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function(data) {
            if (data == -1) {
                alert("上传成功！");
                window.location.reload();
            } else {
                alert(String(data));
            }
        }
    })
}

InitThis();
window.addEventListener('load', function(){
  var canvas;
  var ctx;
  var sentences = [
    '溽暑步月，往昔满心头，十五载相庆相救',
    '路不曾平，志不曾移',
    '少年郎，犹记旧时新月梦'
  ];
  var wordWidth = 18;
  var c_width = window.innerWidth;
  var wordWra = document.querySelector('.wordWra');
  var firstWra = document.querySelector('.first');
  var secondWra = document.querySelector('.second');
  var thirdWra = document.querySelector('.third');
  var wordSlide = document.querySelector('.swiper-slide');
  var imgs = document.querySelectorAll('.imgWra img');
  var progress = 0;
  var fullProgress = 25;
  var pageLock = true;
  var stage = 1;

  function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = c_width;
    ctx.font = '18px KaiTi,STKaiti';
    // setTimeout(drawText,0);
    var timer;
    var lock = false;

    wordWra.addEventListener('touchstart', function(e) {
      e.stopPropagation();
      if(lock) return;
      lock = true;
      timer = setInterval(function(){
        if(progress >= fullProgress) {
          clearInterval(timer);
          drawText(function() {
            progress = 0;
            stage++;
            if(stage<=3) lock = false;
            else {
              pageLock = false;
            }
          });
        }
        else {
          progress++;
          fill(stage);
        }
      }, 100);
    });
    wordWra.addEventListener('touchend', function(){
      if(timer) {
        clearInterval(timer);
        lock = false;
      }
    });
    wordSlide.addEventListener('touchmove', function (e) {
      if(pageLock) e.stopPropagation();
    });
  }

  function fill(stage){
    if(stage === 1){
      firstWra.style.height = progress/fullProgress*154+'px';
    }
    if(stage === 2){
      secondWra.style.height = progress/fullProgress*182+'px';
    }
    if(stage === 3){
      thirdWra.style.width = progress/fullProgress*194+'px';  
    }
  }
  function drawText(callback){
    var i = 0;
    var fadeStep = 10;
    var startPosition = (c_width-wordWidth*sentences[stage-1].length)/2;
    if(stage>1)  imgs[stage-2].style.opacity = 0;
    imgs[stage-1].style.opacity = 1;
    var clock = setInterval(function() {
      if(!sentences[stage-1][i]){
        clearInterval(clock);
        callback();
      }else{
        ctx.clearRect(0,0,c_width,40);
        ctx.fillStyle = 'rgba(0,0,0,'+ Tween.Quad.easeIn(i, 0.2, 1, sentences[stage-1].length) +')';
        ctx.fillText(sentences[stage-1].substring(0,i+1), startPosition, 20);
        i++;
      }
    }, 200);
  }
  init();
});