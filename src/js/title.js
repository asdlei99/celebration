/* ==================================================
<| $(document).ready
================================================== */
$(document).ready(function() {
    setTimeout(function() {
        $(".onloading").fadeOut();
    }, 1000);
});
window.addEventListener('load', function() {
    initializePageTitle();
});
/* ==================================================
<| initializePageTitle
================================================== */
function initializePageTitle() {
    /* fingerprinting args */
    var timer = 0;
    var printing;
    var $intro = $(".intro");
    var $fingerprint = $(".fingerprint");
    var lock = false;
    /* if keep printing */
    $intro.on('touchstart', (function(event) {
        /* set timer */
        event.preventDefault();
        $intro.css({ visibility: 'hidden' });
        $fingerprint.css({ visibility: 'visible' });
        $fingerprint.addClass("bling");
        printing = setTimeout(function() {
            $fingerprint.removeClass("bling");
            $(".m-title").parent().removeClass("swiper-no-swiping");
            swiper.slideNext(false);
            $intro.hide();
            lock = true;
        }, 2000);
    }));
    $intro.on("touchend", function() {
        clearTimeout(printing);
        if (!lock) {
            $fingerprint.css({ visibility: 'hidden' });
            $fingerprint.removeClass("bling");
            $intro.css({ visibility: 'visible' });
        }
    });
}