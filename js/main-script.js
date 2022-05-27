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
						
							const careerClickBtn = document.querySelector('.tell-us-career__personal-information--click');
							
							if (true) {
								careerClickBtn.addEventListener("click", function(e) {
									careerClickBtn.classList.toggle('active')
								});
							}