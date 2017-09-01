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
var index_i = 0;

var first_pic = $(".window li").first().clone();
var size = $(".window li").length;
var toleft = $(".window li img").width();
var win_width = size*toleft + "px";
var left;


$(".window").css("width",win_width);
$(".window").append(first_pic);

var key = 0;
var timer = setInterval(autoplay,1000);

function autoplay(){
	key++;
	if (key>size-1) {
		$(".window").css("margin-left","0px");
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
		for(var i=0;i<len-1;i++){
			var new_img = '<li><img src="'+data[i]+'"></li>';
			$(".window").append(new_img);
			size++;
			$(".window").width(size*toleft);
		}
	},
})
var mousePressed = false;
var lastX, lastY;
var ctx;
var canvas_width = $("#myCanvas").width();
var canvas_height = $("#myCanvas").height();

function Draw(x, y, isDown){
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

function InitThis(){
    ctx = document.getElementById('myCanvas').getContext("2d");
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas_width,canvas_height);
 
    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });
 
    $('#myCanvas').mousemove(function (e) {
    	mousePressed = true;
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });
 
    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

//清空画板
function clearBoard(){
	ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas_width,canvas_height);
}

function UploadPic(){
	var Pic = document.getElementById("myCanvas").toDataURL("image/png",0.5);
	// Pic = utf16ToUtf8(Pic);
	// alert(typeof(Pic));
	$.ajax({
	type: 'POST',
	url:'./api/index.php?name=upload',
	data: {'data':Pic},
	contentType:  'application/x-www-form-urlencoded; charset=utf-8',
	success: function(data){
			if(data==-1){
				alert("上传成功！");	
                window.location.reload();
			}else{
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