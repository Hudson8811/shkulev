/* ------------main----------------------------main------------------------main---------------------main-------------------- */
			
			//events
						//events-filter
							/* const eventsFilterBtns = $('.events__filter-btns');
							const eventsSwiperItems = $('.events__swiper-item');
							const eventsFilterBtn = $('.events__filter-btn');
							function eventsFilter() {
								eventsFilterBtns.on("click", event => {
									const targetId = event.target.getAttribute('data-id')
									const target = $(event.target)
								
									if (target.hasClass('events__filter-btn')) {
										eventsFilterBtn.each(function () {
											$(this).removeClass('active');
										})
										target.addClass('active')
									}
								
									switch (targetId) {
										case 'all':
											getEventsItems('events__swiper-item')
											break;
										case 'events-new':
											getEventsItems(targetId)
											break;
										case 'events-meeting':
											getEventsItems(targetId)
											break;
									}
								});
							}
							eventsFilter()
							function getEventsItems(className) {
								eventsSwiperItems.each(function (index, item) {
									if ($(this).hasClass(className)) {
										var that = $(this);
									
										setTimeout(function () {
											that.show(400);
										}, 0);
									} else {
										var that = $(this);
									
										setTimeout(function () {
											that.hide(400);
										}, 430);
									}
								});
							} */
						//events-swiper
							/* var swiper = new Swiper(".events__swiper", {
								slidesPerView: 'auto',
								navigation: {
									prevEl: ".events__swiper-btn-prev",
									nextEl: ".events__swiper-btn-next",
								},
								breakpoints: {
									769: {
										slidesPerView: 3,
									},
									1024: {
										slidesPerView: 4,
									},
								},
							}); */

							$(function() {
								$(".slider").slick({
									slidesToShow: 4,
									arrows: true,
									infinite: false,
									speed: 300,
									responsive: [
										{
											breakpoint: 769,
											settings: {
												slidesToShow: 1,
												infinite: false,
												variableWidth: true
											}
										}
									]
								});
							
								$(".events__filter-btn").on('click', function(){
									var filter = $(this).data('filter');
									$(".slider").slick('slickUnfilter');

									if(filter == 'events-new'){
										$(".slider").slick('slickFilter','.events-new');
									}
									else if(filter == 'events-meeting'){
										$(".slider").slick('slickFilter','.events-meeting');
									}
									else if(filter == 'all'){
									
										$(".slider").slick('slickUnfilter');
									}
								})
							});
						


			//projects
						//project-filter
							const windowInnerWidth = window.innerWidth;
							if (windowInnerWidth < 769) {
								var project_initial_items_desktop = 3;
							} else {
								var project_initial_items_desktop = 6;
							}
							var project_next_items_desktop = 2;
							var $projects__items_desktop = $('#projects__items-desktop').isotope({
								itemSelector: '.projects__item-desktop',
								layoutMode: 'masonry',
								stamp: '.projects__item-desktop--static'
							});

							$('.projects__filter-btns-desktop').on('click', 'button', function () {
								var project_desktop_value = $(this).attr('data-filter');
								$projects__items_desktop.isotope({filter: project_desktop_value});
								project_updateFilterCounts_desktop();
							});
							function project_updateFilterCounts_desktop() {
								var itemElems_project_desktop = $projects__items_desktop.isotope('getFilteredItemElements');
								var count_items_project_desktop = $(itemElems_project_desktop).length;
							
								if (count_items_project_desktop > project_initial_items_desktop) {
									$('#projects__btn-plus-desktop').show();
								}
								else {
									$('#projects__btn-plus-desktop').hide();
								}
								if ($('.projects__item-desktop').hasClass('visible_item')) {
									$('.projects__item-desktop').removeClass('visible_item');
								}
								var index = 0;
									$(itemElems_project_desktop).each(function () {
									if (index >= project_initial_items_desktop) {
										$(this).addClass('visible_item');
									}
									index++;
								});
								$projects__items_desktop.isotope('layout');
							}
							$('.projects__filter-btns-desktop').each(function (i, buttonGroup) {
								var $buttonGroup = $(buttonGroup);
								$buttonGroup.on('click', 'button', function () {
									$buttonGroup.find('.active').removeClass('active');
									$(this).addClass('active');
								});
							});

							function project_showNextItems_desktop(pagination) {
								var itemsMax_project_desktop = $('.visible_item').length;
								var itemsCount = 0;
								$('.visible_item').each(function () {
									if (itemsCount < pagination) {
										$(this).removeClass('visible_item');
										itemsCount++;
									}
								});
								if (itemsCount >= itemsMax_project_desktop) {
									$('#projects__btn-plus-desktop').hide();
								}
								$projects__items_desktop.isotope('layout');
							}
							function project_hideItems_desktop(pagination) {
								var itemsMax_project_desktop = $('.projects__item-desktop').length;
								var itemsCount = 0;
								$('.projects__item-desktop').each(function () {
									if (itemsCount >= pagination) {
										$(this).addClass('visible_item');
									}
									itemsCount++;
								});
								if (itemsCount < itemsMax_project_desktop || project_initial_items_desktop >= itemsMax_project_desktop) {
									$('#projects__btn-plus-desktop').hide();
								}
								$projects__items_desktop.isotope('layout');
							}
							$('#projects__btn-plus-desktop').on('click', function (e) {
								e.preventDefault();
								project_showNextItems_desktop(project_next_items_desktop);
							});
							project_hideItems_desktop(project_initial_items_desktop);


			//history
						//history-swiper
							var swiper = new Swiper(".main-history__swiper", {
								slidesPerView: 1,
								spaceBetween: 80,
								navigation: {
									prevEl: ".main-history__swiper-btn-prev",
									nextEl: ".main-history__swiper-btn-next",
								},
								breakpoints: {
									769: {
										slidesPerView: 3,
										spaceBetween: 40,
									},
									1200: {
										slidesPerView: 4,
										spaceBetween: 80,
									},
								},
							});


			//spec-projects
						//spec-projects-swiper
							var swiper = new Swiper(".spec-projects__swiper-main", {
								slidesPerView: 'auto',
								autoHeight: true,
								navigation: {
									prevEl: ".spec-projects__swiper-btn-prev",
									nextEl: ".spec-projects__swiper-btn-next",
								},
								breakpoints: {
									769: {
										slidesPerView: 3
									}
								}
							});



/* ----------------------project-page---------------------------project-page---------------------------project-page-------------------- */
			//elle-events__swiper
							var swiper = new Swiper(".elle-events__swiper", {
								slidesPerView: '3',
								spaceBetween: 80,
								navigation: {
									prevEl: ".elle-events__swiper-btn-prev",
									nextEl: ".elle-events__swiper-btn-next",
								},
							});




/* --------------docs---------------------docs--------------------------------docs------------------ */
							$(".docs-btn-magazines").click(function () {
								$('.docs-btn-magazines').addClass("active");
								$('.docs-btn-sites').removeClass("active");
							
								$('.docs__items-sites').slideUp(600);
								$('.docs__items-magazines').slideDown(600);
							});
						
							$(".docs-btn-sites").click(function () {
								$('.docs-btn-sites').addClass("active");
								$('.docs-btn-magazines').removeClass("active");
							
								$('.docs__items-magazines').slideUp(600);
								$('.docs__items-sites').slideDown(600);
							});
						
						

/* ------------------news-page-----------------------------news-page------------------news-page----------- */
							var swiper = new Swiper(".sec6-news-page__swiper", {
								navigation: {
									nextEl: ".sec6-news-page-btn-next",
									prevEl: ".sec6-news-page-btn-prev",
								},
							});
						
							var swiper = new Swiper(".sec7-news-page-history__swiper", {
								slidesPerView: 2,
								spaceBetween: 80,
								navigation: {
									prevEl: ".sec7-news-page-history__swiper-btn-prev",
									nextEl: ".sec7-news-page-history__swiper-btn-next",
								},
							});
						
							var swiper = new Swiper(".sec8-news-page__items-mobile", {});



/* ----------------------elle-team----------------------------------elle-team----------------------------elle-team-------------- */
							$('.elle-team__btn-plus').click(function () {
								$('.elle-team__row-next:hidden').eq(0).show(500);
								$('.elle-team__row-next:hidden').length < 1 ? $('button.elle-team__btn-plus').hide(200) : false;
							});



/* -------------------------noimage-page--------------------------------noimage-page-------------------------------noimage-page------------------------------- */
							$(".team-noimage-page__btn-sale").click(function () {
								$('.team-noimage-page__btn-redaction').removeClass("active");
								$('.team-noimage-page__btn-sale').addClass("active");
								$('.team-noimage-page__body-sale').slideDown(600);
								$('.team-noimage-page__body-redaction').slideUp(600);
								$('.team-noimage-page__wrapper-sale-mobile').slideUp(600);
								$('.team-noimage-page__wrapper-redaction-mobile').slideDown(600);
							});
							$(".team-noimage-page__btn-redaction").click(function () {
								$('.team-noimage-page__btn-sale').removeClass("active");
								$('.team-noimage-page__btn-redaction').addClass("active");
								$('.team-noimage-page__body-redaction').slideDown(600);
								$('.team-noimage-page__body-sale').slideUp(600);
								$('.team-noimage-page__wrapper-redaction-mobile').slideUp(600);
								$('.team-noimage-page__wrapper-sale-mobile').slideDown(600);
							});
						
							$('.team-noimage-page__btn-plus-redaction').click(function () {
								$('.team-noimage-page__wrapper-redaction-next:hidden').eq(0).show(500);
								$('.team-noimage-page__wrapper-redaction-next:hidden').length < 1 ? $('button.team-noimage-page__btn-plus-redaction').hide(200) : false;
							});
							$('.team-noimage-page__btn-plus-sale').click(function () {
								$('.team-noimage-page__wrapper-sale-next:hidden').eq(0).show(500);
								$('.team-noimage-page__wrapper-sale-next:hidden').length < 1 ? $('button.team-noimage-page__btn-plus-sale').hide(200) : false;
							});
						
							$('.team-noimage-page__btn-plus-redaction-mobile').click(function () {
								$('.team-noimage-page__items-redaction-mobile-next:hidden').eq(0).show(500);
								$('.team-noimage-page__items-redaction-mobile-next:hidden').length < 1 ? $('button.team-noimage-page__btn-plus-redaction-mobile').hide(200) : false;
							});
							$('.team-noimage-page__btn-plus-sale-mobile').click(function () {
								$('.team-noimage-page__items-sale-mobile-next:hidden').eq(0).show(500);
								$('.team-noimage-page__items-sale-mobile-next:hidden').length < 1 ? $('button.team-noimage-page__btn-plus-sale-mobile').hide(200) : false;
							});
						
							$('.vacancies-noimage-page__btn-plus').click(function () {
								$('.vacancies-noimage-page__item-wrapper-hidden:hidden').eq(0).show(500);
								$('.vacancies-noimage-page__item-wrapper-hidden:hidden').length < 1 ? $('button.vacancies-noimage-page__btn-plus').hide(200) : false;
							});




/* ----------------------contacts-page----------------------contacts-page-------------------contacts-page----------- */
							const form_checkbox = document.querySelector('.form-contacts-page__click');
							form_checkbox.addEventListener("click", function(e) {
								form_checkbox.classList.toggle('active')
							});



							var swiper = new Swiper(".elle-events__swiper", {
								slidesPerView: 'auto',
								spaceBetween: 80,
								navigation: {
									prevEl: ".elle-events__swiper-btn-prev",
									nextEl: ".elle-events__swiper-btn-next",
								},
							});
							var swiper = new Swiper(".project-page__spec-projects-swiper", {
								slidesPerView: 1,
								spaceBetween: 40,
								navigation: {
									prevEl: ".project-page-spec-projects__swiper-btn-prev",
									nextEl: ".project-page-spec-projects__swiper-btn-next",
								},
								breakpoints: {
									700: {
										slidesPerView: 2,
										spaceBetween: 60,
									},
									1200: {
										slidesPerView: 3,
										spaceBetween: 80,
									},
								},
							});

