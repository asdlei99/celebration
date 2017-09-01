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