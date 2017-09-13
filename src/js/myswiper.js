/* ==================================================
<| swiper
================================================== */
var swiper;
window.addEventListener('load', function() {
	var firstLoad = true;
	swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		mousewheelControl: false,
		onSlideNextStart: function(swiper){
				if(swiper.activeIndex === 4){
					if(firstLoad) initSignature();
					firstLoad = false;
				} //切换结束时，告诉我现在是第几个slide
		}
	});
	var startScroll, touchStart, touchCurrent;
	var isx5 = isWechatOrQQ();
	var distanceFix = isx5 ? 1 : 0;// 修复微信qq下滑动位置判断bug
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
					( touchesDiff > 0 && startScroll >= ( slide.scrollHeight - slide.offsetHeight - distanceFix ) ) || //start from bottom edge to scroll top
					( startScroll > 0 && startScroll < ( slide.scrollHeight - slide.offsetHeight - distanceFix ) ) //start from the middle
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
	function isWechatOrQQ(){
		var ua = navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i)=="micromessenger" || ua.match(/QQ/i) == "qq") { 
			return true;
		}	
		return false;
	}
});