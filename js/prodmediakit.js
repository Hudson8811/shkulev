$(document).ready(function() {
	var statistics = false;

	function statisticsScrollTracking2(){
		if (statistics) {
			return false;
		}
		var wt = $(window).scrollTop();
		var wh = $(window).height();
		var et = $('.statistics-prodmediakit__digits').offset().top;
		var eh = $('.statistics-prodmediakit__digits').outerHeight();
		var dh = $(document).height();   
		if (wt + wh >= et || wh + wt == dh || eh + et < wh){
			statistics = true;

			$(document).ready(function () {
				$('.statistics-prodmediakit-count').each(function () {
					$(this).prop('Counter', 0).animate({
						Counter: $(this).text()
					}, {
						duration: 1000,
						easing: 'swing',
						step: function (now) {
							$(this).text(Math.ceil(now));
						}
					});
				});
			});
		}
	}
	$(window).scroll(function(){
		statisticsScrollTracking2();
	});

	$(document).ready(function(){ 
		statisticsScrollTracking2();
	});
});
$(document).ready(function() {
	var user = false;

	function userScrollTracking2(){
		if (user) {
			return false;
		}
		var wt = $(window).scrollTop();
		var wh = $(window).height();
		var et = $('.user-prodmediakit__digits').offset().top;
		var eh = $('.user-prodmediakit__digits').outerHeight();
		var dh = $(document).height();   
		if (wt + wh >= et || wh + wt == dh || eh + et < wh){
			user = true;

			$(document).ready(function () {
				$('.user-prodmediakit-count').each(function () {
					$(this).prop('Counter', 0).animate({
						Counter: $(this).text()
					}, {
						duration: 1000,
						easing: 'swing',
						step: function (now) {
							$(this).text(Math.ceil(now));
						}
					});
				});
			});
		}
	}
	$(window).scroll(function(){
		userScrollTracking2();
	});

	$(document).ready(function(){ 
		userScrollTracking2();
	});
});
$(document).ready(function() {
	var user_interests = false;

	function user_interestsScrollTracking2(){
		if (user_interests) {
			return false;
		}
		var wt = $(window).scrollTop();
		var wh = $(window).height();
		var et = $('.user-prodmediakit-interests__digits').offset().top;
		var eh = $('.user-prodmediakit-interests__digits').outerHeight();
		var dh = $(document).height();   
		if (wt + wh >= et || wh + wt == dh || eh + et < wh){
			user_interests = true;

			$(document).ready(function () {
				$('.user-prodmediakit-interests-count').each(function () {
					$(this).prop('Counter', 0).animate({
						Counter: $(this).text()
					}, {
						duration: 1000,
						easing: 'swing',
						step: function (now) {
							$(this).text(Math.ceil(now));
						}
					});
				});
			});
		}
	}
	$(window).scroll(function(){
		user_interestsScrollTracking2();
	});

	$(document).ready(function(){ 
		user_interestsScrollTracking2();
	});
});


var swiper_specprojects_inner1_longrid = new Swiper(".cases-prodmediakit__swiper", {
	slidesPerView: "1.24",
	navigation: {
		prevEl: ".cases-prodmediakit__swiper-btn-prev",
		nextEl: ".cases-prodmediakit__swiper-btn-next",
	},
	breakpoints: {
		769: {
			slidesPerView: "2.92",
		}
	}
});