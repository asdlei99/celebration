function showQR() {
    $("#QRcode").css("display", "block");
    $('#QRcode').closest('.swiper-slide').addClass('swiper-no-swiping');
}
$("#hideQR").click(function(e) {
    $("#QRcode").css("display", "none");
    $('#QRcode').closest('.swiper-slide').removeClass('swiper-no-swiping');
});