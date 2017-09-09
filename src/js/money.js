function showQR() {
    $("#QRcode").css("display", "block");
}
$("#QRcode").click(function(e) {
    if ($(e.target).attr("id") == "hideQR")
        $("#QRcode").css("display", "none");
})