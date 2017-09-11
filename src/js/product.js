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
    var list = ["2017", "2016", "2015", "2013", "2012", "2011", "2006", "2005", "2002"];
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
    /* set event */
    menu.attr("tabindex", 0);
    menu.focus();
    menu.bind("keydown", function(event) {
        scrollEffect(menu, event);
    });
    /* bind event */
    menu.bind("click", function(event) {
        console.log("clock");
    });
    menu.bind("mouseover", function() {
        menu.unbind("keydown");
        menu.bind("keydown", function(event) {
            scrollEffect(menu, event);
        });
    });
    menu.bind("mouseout", function() {
        menu.unbind("keydown");
    });
    var X, Y, startX, startY, lock = false;
    menu.bind("touchstart", function(event) {
        startX = event.originalEvent.changedTouches[0].pageX,
            startY = event.originalEvent.changedTouches[0].pageY;
    });
    menu.bind("touchmove", function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (lock) return;
        lock = true;
        var moveEndX = event.originalEvent.changedTouches[0].pageX,
            moveEndY = event.originalEvent.changedTouches[0].pageY;
        X = moveEndX - startX;
        Y = moveEndY - startY;
        if (Y > 0) {
            scrollEffect(menu, event, 40);
        }
        if (Y < 0) {
            scrollEffect(menu, event, 38);
        }
    });
    menu.bind("touchend", function(event) {
        lock = false;
    });
}
/* ==================================================
<| scrollEffect
================================================== */
$(".yearpro").height($(".carousel").height());

function scrollEffect(menu, event, direction) {
    /* initialize */
    var key = direction || event.which;
    var rate = 70 + 4;
    var options = menu.find("p");
    var option = options.find(".active");
    var index = menu.attr("index");
    var now = index;
    var height = $(".yearpro").height();

    switch (key) {
        case 40:
            if (index >= 1) {
                now--;
                menu.animate({ marginTop: '+=' + 1.75 + 'rem' });
                $("#pro2017").animate({ marginTop: -6 * index + 6 + 'rem' });
            }
            break;
        case 38:
            if (index < 8) {
                now++;
                menu.animate({ marginTop: '-=' + 1.75 + 'rem' });
                $("#pro2017").animate({ marginTop: -6 * index - 6 + 'rem' });
            }
            break;
    }
    /* set animation */
    var css = {
        fontSize: '40px',
        color: '#A0A0A0'
    };
    var cssActive = {
        fontSize: '56px',
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