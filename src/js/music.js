/* ==================================================
<| $(document).ready
================================================== */
//播放器控制
var audio = document.getElementById('mp3');
$('.music').click(function() {
    //防止冒泡
    event.stopPropagation();
    if (audio.paused) //如果当前是暂停状态
    {
        $('.music').css("animation", "rotate 2s infinite linear");
        audio.play(); //播放
        return;
    }

    //当前是播放状态
    $('.music').css("animation", "circle 2s infinite linear ");
    audio.pause(); //暂停
});