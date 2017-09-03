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