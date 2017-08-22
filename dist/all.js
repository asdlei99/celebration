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