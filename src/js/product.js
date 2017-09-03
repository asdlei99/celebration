/* ==================================================
<| $(document).ready
================================================== */
$(document).ready(function() {
	initializePageProduct();
});
/* ==================================================
<| initializePageProduct
================================================== */
function initializePageProduct() {
	/* yearlist */
	var yearlist = $(".m-product").find(".yearlist");
	var menu = yearlist.find(".menu").find(".options");
	var list = ["2017", "2016", "2015", "2002"];
	initializeMenu(menu, list);
}
/* ==================================================
<| initializeMenu
================================================== */
function initializeMenu(menu, list) {
	list.forEach(function(value) {
		var option = $("<p></p>").text(value);
		menu.append(option);
	});
	var options = menu.find("p");
	var option = options.first();
	option = $(options[1]);
	option.addClass("active");
}