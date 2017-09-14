function showQR() {
    $("#QRcode").css("display", "block");
    $('#QRcode').closest('.swiper-slide').addClass('swiper-no-swiping');
}
$("#QRcode").click(function(e) {
    if ($(e.target).attr("id") == "hideQR")
        $("#QRcode").css("display", "none");
    $('#QRcode').closest('.swiper-slide').removeClass('swiper-no-swiping');
});