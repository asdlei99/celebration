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
	/* options */
	list.forEach(function(value) {
		var option = $("<p></p>").text(value);
		menu.append(option);
	});
	/* set active */
	menu.attr("index", 0);
	var options = menu.find("p");
	var option = options.first(); //option = $(options[1]);
	option.addClass("active");
	/* bind event */
	menu.attr("tabindex", 0);
	menu.focus();
	$(document).bind("keydown", function(event) {
		scrollEffect(menu, event);
	});
	/* bind event */
	/*menu.bind("mouseover", function() {
		menu.unbind("keydown");
		menu.bind("keydown", function(event) {
			scrollEffect(menu, event);
		});
	});
	menu.bind("mouseout", function() {
		menu.unbind("keydown");
	});*/
}
/* ==================================================
<| scrollEffect
================================================== */
function scrollEffect(menu, event) {
	/* initialize */
	var key = event.which;
	var rate = 1.9+0.1;
	var options = menu.find("p");
	var option = options.find(".active");
	var index = menu.attr("index");
	var now = index;
	/* keydown: 37-left, 38-up, 39-right, 40-down */
	switch (key) {
	case 40:
		if (index >= 1) {
			now --;
			menu.animate({marginTop: '+=' + rate + 'rem'});
			break;
		} else {
			return;
		}
	case 38:
		if (index < 4-1) {
			now ++;
			menu.animate({marginTop: '-=' + rate + 'rem'});
			break;
		} else {
			return;
		}
	default:
		return;
	}
	/* set animation */
	var css = {
		fontSize: '1.0rem',
		color: '#A0A0A0'
	};
	var cssActive = {
		fontSize: '1.4rem',
		color: '#00A0E9'
	}
	$(options[index]).animate(css);
	$(options[now]).animate(cssActive);
	/* set active index after the animation */
	setTimeout(function() {
		$(options[index]).removeClass("active");
		$(options[now]).addClass("active");
	}, 500);
	menu.attr("index", now);
}