$(".window li img").css("width", "150px");

var first_pic = $(".window li").first().clone();
var window_wid = $(window).width() + 'px';
var size = 2;
var toleft = $(".window li img").width();
var win_width = size * toleft + "px";
var margin_left;
var left1, left2, left3;
var play_clone, m;

$(".window").css("width", win_width);

var key1 = 0;
var key2 = 0;
var key3 = 0;

function autoplay1() {
    if (key1 == 1) {
        $("#first_danmu ul").stop().css("margin-left", window_wid);
        key1 = 0;
    } else {
        $("#first_danmu ul").animate({ marginLeft: margin_left }, 0.8 * m, "linear");
        key1++;
    }
}

function autoplay2() {
    if (key2 == 1) {
        $("#second_danmu ul").stop().css("margin-left", window_wid);
        key2 = 0;
    } else {
        $("#second_danmu ul").animate({ marginLeft: margin_left }, 1.6 * m, "linear");
        key2++;
    }
}

function autoplay3() {
    if (key3 == 1) {
        $("#third_danmu ul").stop().css("margin-left", window_wid);
        key3 = 0;
    } else {
        $("#third_danmu ul").animate({ marginLeft: margin_left }, m, "linear");
        key3++;
    }
}

//获取每次img的src储存到数组中
function Download() {
    var srcArray = new Array();
    var i = 0;
    $(".picc").each(function() {
        srcArray[i] = $(this)[0].src;
        i++;
    });
}

Download();

$.ajax({
    type: 'POST',
    url: 'api/index.php?name=download',
    success: function(data) {
        data = JSON.parse(data);
        //每次获取到url的时候新建一个图片
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var new_img = '<li><img src="' + data[i] + '"></li>';
            $(".window").append(new_img);
            size++;
            $(".window").width(size * 150);
            $(".play1").width(size * 150);
            m = 500 * size;
        }
        $(".window").append(first_pic);
        $(".window li img").css("width", "150px");
        margin_left = -1 * size * toleft + 'px';
        $(".play1").append(play_clone);
        var timer1 = setInterval(autoplay1, 0.8 * m);
        var timer2 = setInterval(autoplay2, 1.4 * m);
        var timer3 = setInterval(autoplay3, m);
    },
})