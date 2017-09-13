var mousePressed = false;
var lastX, lastY;
var ctx;
var canvas_width = $(window).width() - 2; // 考虑边框
var canvas_height = "250px";

function Draw(x, y, isDown) {
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

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");
    var pic0 = document.getElementById('myCanvas');
    pic0.width = canvas_width;
    pic0.height = 250;
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas_width, 250);

    var $canvas = $('#myCanvas');
    $canvas[0].addEventListener('touchstart', function(e) {
        mousePressed = true;
        e = e.touches[0];
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    });
    $canvas[0].addEventListener('touchmove', function(e) {
        e.stopPropagation();
        if (mousePressed) {
            e = e.touches[0];
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });
    $canvas[0].addEventListener('touchend', function() {
        mousePressed = false;
    });
    $canvas.mouseup(function(e) {
        mousePressed = false;
    });
    $canvas.mouseleave(function(e) {
        mousePressed = false;
    });
}

InitThis();


//清空画板
function clearBoard() {
    ctx.clearRect(0, 0, canvas_width, 250);
}

function UploadPic() {
    var Pic = document.getElementById("myCanvas").toDataURL("image/png", 0.5);
    $.ajax({
        type: 'POST',
        url: './api/index.php?name=upload',
        data: { 'data': Pic },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function(data) {
            if (data == -1) {
                alert("上传成功！");
                initSignature();
                swiper.slidePrev(false);
            } else {
                alert("上传失败！请重试！");
            }
        }
    })
}