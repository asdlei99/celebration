window.addEventListener('load', function() {
    var canvas;
    var ctx;
    var sentences = [
        '溽暑步月，往昔满心头，十五载相庆相救',
        '路不曾平，志不曾移',
        '少年郎，犹记旧时新月梦'
    ];
    var wordWidth = 36;
    var c_width = window.innerWidth;
    var wordWra = document.querySelector('.wordWra');
    var firstWra = document.querySelector('.first');
    var secondWra = document.querySelector('.second');
    var thirdWra = document.querySelector('.third');
    var wordSlide = document.querySelector('#word');
    var imgs = document.querySelectorAll('.imgWra img');
    var progress = 0;
    var fullProgress = 25;
    var stage = 1;
    var drawLock = false;
    
    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = c_width * 2;
        ctx.font = '36px KaiTi,STKaiti';
        var timer;
        var lock = false;
        var $tipIcon = $('.icon-finger');
        wordWra.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (lock) return;
            lock = true;
            $tipIcon.hide();
            timer = setInterval(function() {
                if (progress >= fullProgress) {
                    clearInterval(timer);
                    drawText(function() {
                        progress = 0;
                        $tipIcon.removeClass('stage'+stage);
                        stage++;
                        $tipIcon.addClass('stage'+stage);
                        if (stage <= 3) {
                            lock = false;
                            drawLock = false;
                            setTimeout(function() {
                                $tipIcon.show();
                            }, 500);
                        }
                        else {
                            $('#word').removeClass('swiper-no-swiping');
                            $tipIcon.hide();
                        }
                    });
                } else {
                    progress += 2;
                    fill(stage);
                }
            }, 100);
        });
        wordWra.addEventListener('touchend', function() {
            if (timer) {
                clearInterval(timer);
                lock = false;
            }
        });
    }

    function fill(stage) {
        if (stage === 1) {
            firstWra.style.height = progress / fullProgress * 154 + 'px';
        }
        if (stage === 2) {
            secondWra.style.height = progress / fullProgress * 182 + 'px';
        }
        if (stage === 3) {
            thirdWra.style.width = progress / fullProgress * 194 + 'px';
        }
    }

    function drawText(callback) {
        if(drawLock) return;
        drawLock = true;// 避免绘制过程再次出发touch事件
        var i = 0, j=1;
        var fadeStep = 10;// 文字淡入step数，用于Tween
        var startPosition = (c_width * 2 - wordWidth * sentences[stage - 1].length) / 2;// 根据文字长度计算渲染起始位置
        if (stage > 1) imgs[stage - 2].style.opacity = 0;
        imgs[stage - 1].style.opacity = 1;
        ctx.clearRect(0, 0, c_width * 2, 80);// 渲染下一幕文字时清空画布
        var clock = setInterval(function() {
            if (!sentences[stage - 1][i] && j===fadeStep) {// 当前文字渲染结束调用回调
                clearInterval(clock);
                callback();
            } else {
                j>fadeStep?j=1:j;
                ctx.fillStyle = 'rgba(0,0,0,' + Tween.Quad.easeIn(j, 0.2, 1, fadeStep) + ')';// 透明度计算，用于渐进渲染
                if(j++===1) {// 开始渲染某个文字
                    ctx.fillText(sentences[stage - 1][i], startPosition+wordWidth*i, wordWidth);
                    i++;
                }else{// 渐进渲染当前文字
                    ctx.clearRect(startPosition+wordWidth*(i-1), 0, wordWidth, 40);
                    ctx.fillText(sentences[stage - 1][i-1], startPosition+wordWidth*(i-1), wordWidth);
                }
            }
        }, 16);
    }
    init();
});