/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 * @link https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array/6274381#6274381
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

$(function () {
    var danmakuWrapper = document.getElementById('danmaku_wrapper');
    var danmakuPainter = new DanmakuPainter(danmakuWrapper);
    var random = function (min, max) {
        return min + (max - min) * Math.random();
    };
    var resize = function () {
        danmakuWrapper.style.height = window.innerHeight - $(danmakuWrapper).offset().top - 160 + 'px';
        danmakuPainter.resize.bind(danmakuPainter)();
    };
    resize();
    window.addEventListener('resize', resize);
    var timerIds = [];
    window.initSignature = function () { // 在swiper滑动时监听
        $.ajax({
            type: 'POST',
            url: 'api/index.php?name=download',
            success: function (data) {
                while (timerIds.length) {
                    clearTimeout(timerIds.pop())
                }
                if ('string' === typeof data) {
                    data = JSON.parse(data);
                }
                var launch = function () {
                    shuffle(data);
                    var danmakuWrapperHeight = danmakuWrapper.clientHeight;
                    var t = 0;
                    for (var i = 0; i < data.length; ++i) {
                        var img = document.createElement('img');
                        img.src = data[i];
                        var imgHeight = danmakuWrapperHeight * random(.1, .3);
                        var imgWidth = imgHeight * 150 / 90;
                        img.style.height = imgHeight + 'px';
                        img.style.width = imgWidth + 'px';
                        img.style.opacity = random(.5, 1);

                        var div = document.createElement('div');
                        div.style.height = img.style.height;
                        div.style.width = imgWidth * random(1, 3) + 'px';
                        div.appendChild(img);

                        t += random(.1, .5);
                        danmakuPainter.launch(new Danmaku(div, 0, 5), t);
                    }
                    timerIds.push(setTimeout(launch, t * 1000));
                };
                launch();
            }
        });
    }
});
