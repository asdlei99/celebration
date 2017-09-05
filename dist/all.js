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

 /**
 *  jQuery Color Animations
 * @author 愚人码头
 * 源自：jQuery UI    jquery.effects.core.js
 *
 */

;(function(jQuery){

	// 所有颜色样式
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/
    //一个JavaScript 数组，其中包含 0和255之间的三个数字， (ie [255,255,255]).
    //An RGB 'function call syntax' string. either interger or percentage float form. (ie rgb(255,255,255) or rgb(100%,100%,100%))
    //An RGB hex value. Either short or long form. (ie #FFF or #FFFFFF)
    //A W3C standard colour name string as defined at W3Schools. (ie 'white', 'blue', 'red', 'black', et. al)

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// 一个JavaScript 数组，其中包含 0和255之间的三个数字，例如： [255,255,255]
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}

	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break;

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};

	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};

})(jQuery);
/* ==================================================
<| swiper
================================================== */
var swiper;
window.addEventListener('load', function() {
	swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		slidesPerView: 'auto',
		mousewheelControl: true,
	});
	var startScroll, touchStart, touchCurrent;
	swiper.slides.on('touchstart', function(e) {
		startScroll = this.scrollTop;
		touchStart = e.targetTouches[0].pageY;
	}, true);
	swiper.slides.on('touchmove', function(e) {
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
	var updateOrientation = function() {
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
	/* options */
	list.forEach(function(value) {
		var option = $("<p></p>").text(value);
		menu.append(option);
	});
	/* set active */
	menu.attr("index", 0);
	var options = menu.find("p");
	var option = options.first(); //option = $(options[1]);
	option.addClass("active");
	/* set event */
	menu.attr("tabindex", 0);
	menu.focus();
	menu.bind("keydown", function(event) {
		scrollEffect(menu, event);
	});
	/* bind event */
	menu.bind("click", function(event) {
		console.log("clock");
	});
	menu.bind("mouseover", function() {
		menu.unbind("keydown");
		menu.bind("keydown", function(event) {
			scrollEffect(menu, event);
		});
	});
	menu.bind("mouseout", function() {
		menu.unbind("keydown");
	});
}
/* ==================================================
<| scrollEffect
================================================== */
function scrollEffect(menu, event) {
	/* initialize */
	var key = event.which;
	var rate = 76+4;
	var options = menu.find("p");
	var option = options.find(".active");
	var index = menu.attr("index");
	var now = index;
	/* keydown: 37-left, 38-up, 39-right, 40-down */
	switch (key) {
	case 40:
		if (index >= 1) {
			now --;
			menu.animate({marginTop: '+=' + rate + 'px'});
		}
		break;
	case 38:
		if (index < 4-1) {
			now ++;
			menu.animate({marginTop: '-=' + rate + 'px'});
		}
		break;
	}
	/* set animation */
	var css = {
		fontSize: '40px',
		color: '#A0A0A0'
	};
	var cssActive = {
		fontSize: '56px',
		color: '#00A0E9'
	}
	$(options[index]).animate(css);
	$(options[now]).animate(cssActive);
	/* set active index after the animation */
	setTimeout(function() {
		$(options[index]).removeClass("active");
		$(options[now]).addClass("active");
	}, 500);
	menu.attr("index", now);
}
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

window.addEventListener('load', function() {
  return;
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