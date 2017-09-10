/* ==================================================
<| $(document).ready
================================================== */
window.addEventListener('load', function() { //$(document).ready(function() {
        initializePageTitle();
    })
    /* ==================================================
    <| initializePageTitle
    ================================================== */
function initializePageTitle() {
    /* fingerprinting args */
    var timer = 0;
    var printing;
    var button = $(".m-title").find(".mark");
    var $fingerprint = $(".fingerprint img");
    var lock = false;
    /* if keep printing */
    button.on('touchstart', (function(event) { /* mousedown对电脑网页正常，手机页面有奇怪的效果(?) */
        /* set timer */
        event.preventDefault();
        button.css({ visibility: 'hidden' });
        $fingerprint.show();
        $fingerprint.addClass("bling");
        printing = setTimeout(function() {
            $fingerprint.removeClass("bling");
            $(".m-title").parent().removeClass("swiper-no-swiping");
            swiper.slideNext(false);
            $('.intro').css({ visibility: 'hidden' });
            lock = true;
        }, 2000);
    }));
    button.on("touchend", function() {
        clearTimeout(printing);
        if (!lock) {
            $fingerprint.hide();
            $fingerprint.removeClass("bling");
            button.css({ visibility: 'visible' });
        }
    });
}