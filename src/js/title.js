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
			if (timer == 1) {
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
		console.log("mouseup");
		timer = 0;
		clearInterval(printing);
		/* DEBUG */
				/* show icon */
				$(".m-title").find(".dp").fadeOut(1000);
				$(".m-title").find(".fingerprint").find("img").fadeIn(1000);
				/* and swip to the next page */
				setTimeout(function() {
					swiper.slideNext(false);
				}, 2000);
				/* allow to scroll */
				swiper.enableMousewheelControl();
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
