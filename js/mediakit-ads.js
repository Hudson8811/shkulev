

$(document).ready(function() {
	swiper_specprojects_inner2.updateAutoHeight(100);
	swiper_banner_inner2.updateAutoHeight(100);
	swiper_shortformats_inner2.updateAutoHeight(100);
	swiper_bigformats_inner2.updateAutoHeight(100);
});

$(document).ready(function() {
	$(".ads__header-btn").click(function () {
		$('.ads__header-btn').removeClass("active");
		$(this).addClass("active");
		$('.ads__content-inner').addClass("active");
	});

	$(".ads__header-specprojects-btn").click(function () {
		$('.ads__content-inner').slideUp(300);
		setTimeout(function(){
			$('.ads__content-specprojects').slideDown(500);
		}, 300);
	});
	$(".ads__header-banner-btn").click(function () {
		$('.ads__content-inner').slideUp(300);
		setTimeout(function(){
			$('.ads__content-banner').slideDown(500);
		}, 300);
	});
	$(".ads__header-shortformats-btn").click(function () {
		$('.ads__content-inner').slideUp(300);
		setTimeout(function(){
			$('.ads__content-shortformats').slideDown(500);
		}, 300);
	});
	$(".ads__header-bigformats-btn").click(function () {
		$('.ads__content-inner').slideUp(300);
		setTimeout(function(){
			$('.ads__content-bigformats').slideDown(500);
		}, 300);
	});
});




var swiper_specprojects_inner1 = new Swiper(".ads__swiper-specprojects-inner1", {
	slidesPerView: "auto",
	allowTouchMove: false,
});
var swiper_specprojects_inner2 = new Swiper(".ads__swiper-specprojects-inner2", {
	thumbs: {
		swiper: swiper_specprojects_inner1,
	},
	allowTouchMove: false,
	autoHeight: true,
	effect: "fade",
});

var swiper_specprojects_inner1_longrid = new Swiper(".content-inner-ads__swiper-longrid", {
	slidesPerView: "1.24",
	breakpoints: {
		769: {
			slidesPerView: "2.92",
		}
	}
});


var swiper_banner_inner1 = new Swiper(".ads__swiper-banner-inner1", {
	slidesPerView: "auto",
	allowTouchMove: false,
});
var swiper_banner_inner2 = new Swiper(".ads__swiper-banner-inner2", {
	thumbs: {
		swiper: swiper_banner_inner1,
	},
	allowTouchMove: false,
	autoHeight: true,
	effect: "fade",
});

var swiper_shortformats_inner1 = new Swiper(".ads__swiper-shortformats-inner1", {
	slidesPerView: "auto",
	allowTouchMove: false,
});
var swiper_shortformats_inner2 = new Swiper(".ads__swiper-shortformats-inner2", {
	thumbs: {
		swiper: swiper_shortformats_inner1,
	},
	allowTouchMove: false,
	autoHeight: true,
	effect: "fade",
});

var swiper_bigformats_inner1 = new Swiper(".ads__swiper-bigformats-inner1", {
	slidesPerView: "auto",
	allowTouchMove: false,
});
var swiper_bigformats_inner2 = new Swiper(".ads__swiper-bigformats-inner2", {
	thumbs: {
		swiper: swiper_bigformats_inner1,
	},
	allowTouchMove: false,
	autoHeight: true,
	effect: "fade",
});



$(document).ready(function() {
	$('.ads__content-title-mobile').click(function(event) {
		$(this).toggleClass('active').next().slideToggle(500);
	});
}); 