/* ==================================================
<| $(document).ready
================================================== */
$(document).ready(function() {
    initializePageHistory();
});
/* ==================================================
<| initializePageHistory
================================================== */
function initializePageHistory() {
    /* next-page button */
    var button = $(".nxtpage");
    buttom.bind("click", function() {
        swiper.slideNext(false);
    });
    /* auto-scrolling */
    var div = $(".m-history");
    //...
}
/* ==================================================
<| --
================================================== */