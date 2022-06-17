/* ---------------------появление элементов при прокрутке--------------------------- */
							function onEntry(entry) {
								entry.forEach(change => {
									if (change.isIntersecting) {
										change.target.classList.add('active');
									}
								});
							}
							let options = {
								threshold: [0.5] };
							let observer = new IntersectionObserver(onEntry, options);
							let elements = document.querySelectorAll('.show');
							for (let elm of elements) {
								observer.observe(elm);
							}

							$('.menu-header__item-projects').hover(
								function () {
									$('.menu-page-wrapper, .menu-header__item-projects').addClass('active');
								},
								function () {
									$('.menu-page-wrapper, .menu-header__item-projects').removeClass('active');
								}
							);


							$(".icon-menu-header").click(function () {
								$('.icon-menu-header, .header, .menu-page-mobile').toggleClass("active");
							});


							$(document).ready(function() {
							$('.menu-page-mobile__title-projects-main').click(function(event) {
								$(this).toggleClass('active').next().slideToggle(600);
								$('.menu-page-mobile__item-projects-main').toggleClass('active');
								});
							}); 

/* sgp--------------------------sgp------------------------------sgp */
							$('.item-sgp__btn-plus').click(function () {
								$('.item-sgp-hidden:hidden').eq(0).show(600);
								$('.item-sgp-hidden:hidden').length < 1 ? $('button.item-sgp__btn-plus').hide() : false;
							});




							$('.news-page__btn-plus').click(function () {
										$('.news__row-next:hidden').eq(0).show(500);
										$('.news__row-next:hidden').length < 1 ? $('button.news-page__btn-plus').hide(200) : false;
									});


/* ------------------career--------------------------career------------------------career------ */
							var swiper = new Swiper(".tell-us-career__swiper", {
								spaceBetween: 40,
								allowTouchMove: false,
								pagination: {
									el: ".tell-us-career__pagination",
									clickable: true,
								},
							});
							$(".tell-us-career__personal-information--click").click(function () {
								$(this).toggleClass("active");
							});

/* -----------------news-page----------------------news-page-------------------------news-page-------------- */
							$(".sec3-news-page__video-btn").click(function () {
								$('.sec3-news-page__video-btn, .sec3-news-page__video-img').addClass("hide");
							});

							var swiper = new Swiper(".sec6-news-page__swiper", {
								navigation: {
									nextEl: ".sec6-news-page-btn-next",
									prevEl: ".sec6-news-page-btn-prev",
								},
							});
						
							var swiper = new Swiper(".sec8-news-page__items-mobile", {});



/* ----------------------contacts-page----------------------contacts-page-------------------contacts-page----------- */
							$(".form-contacts-page__click").click(function () {
								$(this).toggleClass("active");
							});

							var lastScroll = 0;

							jQuery(document).ready(function($) {
								const windowInnerWidth = window.innerWidth;
								$(".page, .menu-page-mobile").addClass("indent-top");
								$(".menu-header__item, .header__logo-click").addClass("indent-smaler");
								if (windowInnerWidth > 767) {
									$(window).scroll(function(){
										setTimeout(function() {
											var scroll = $(window).scrollTop();
											if (scroll > lastScroll + 0) {
												$(".menu-header__item, .header__logo-click").removeClass("indent-smaler");
											} else if (scroll < lastScroll - 0) {
												$(".menu-header__item, .header__logo-click").addClass("indent-smaler");
											}
											lastScroll = scroll;
										}, 0);
									});
								}
							});


var block_show = false;
function scrollTracking(){
	if (block_show) {
		return false;
	}
	var wt = $(window).scrollTop();
	var wh = $(window).height();
	var et = $('.digits-block__row').offset().top;
	var eh = $('.digits-block__row').outerHeight();
	var dh = $(document).height();   
	if (wt + wh >= et || wh + wt == dh || eh + et < wh){
		block_show = true;
		
		// Код анимации
		$(document).ready(function () {
			$('.count').each(function () {
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
	scrollTracking();
});
	
$(document).ready(function(){ 
	scrollTracking();
});