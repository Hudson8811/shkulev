$(document).ready(function() {
	var block_show2 = false;

	function scrollTracking2(){
		if (block_show2) {
			return false;
		}
		var wt = $(window).scrollTop();
		var wh = $(window).height();
		var et = $('.hero-mediakits__digits').offset().top;
		var eh = $('.hero-mediakits__digits').outerHeight();
		var dh = $(document).height();   
		if (wt + wh >= et || wh + wt == dh || eh + et < wh){
			block_show2 = true;

			$(document).ready(function () {
				$('.mediakits-count').each(function () {
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
		scrollTracking2();
	});

	$(document).ready(function(){ 
		scrollTracking2();
	});
});


$(document).ready(function() {
	var projects_mediakits_initial_items = 9;
	var projects_mediakits_next_items = 3;
	var $projects__mediakits__row = $('.projects-mediakits__row').isotope({
		itemSelector: '.projects-mediakits__item',
		layoutMode: 'fitRows',
	});
	$('.projects-mediakits__btns').on('click', 'button', function () {
		var news_value = $(this).attr('data-filter');
		$projects__mediakits__row.isotope({filter: news_value});
		projects_mediakits_updateFilterCounts();
	});
	function projects_mediakits_updateFilterCounts() {
		var itemElems_news = $projects__mediakits__row.isotope('getFilteredItemElements');
		var count_items_news = $(itemElems_news).length;

		if (count_items_news > projects_mediakits_initial_items) {
			$('#projects-mediakits__btn-plus').show();
		}
		else {
			$('#projects-mediakits__btn-plus').hide();
		}
		if ($('.projects-mediakits__item').hasClass('visible_item')) {
			$('.projects-mediakits__item').removeClass('visible_item');
		}
		var index = 0;
		$(itemElems_news).each(function () {
			if (index >= projects_mediakits_initial_items) {
				$(this).addClass('visible_item');
			}
			index++;
		});
		$projects__mediakits__row.isotope('layout');
	}

	$('.projects-mediakits__btns').each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function () {
			$buttonGroup.find('.active').removeClass('active');
			$(this).addClass('active');
		});
	});
	function projects_mediakits_showNextItems(pagination) {
		var itemsMax_news = $('.visible_item').length;
		var itemsCount = 0;
		$('.visible_item').each(function () {
			if (itemsCount < pagination) {
				$(this).removeClass('visible_item');
				itemsCount++;
			}
		});
		if (itemsCount >= itemsMax_news) {
			$('#projects-mediakits__btn-plus').hide();
		}
		$projects__mediakits__row.isotope('layout');
	}
	function projects_mediakits_hideItems(pagination) {
		var itemsMax_news = $('.projects-mediakits__item').length;
		var itemsCount = 0;
		$('.projects-mediakits__item').each(function () {
			if (itemsCount >= pagination) {
				$(this).addClass('visible_item');
			}
			itemsCount++;
		});
		if (itemsCount < itemsMax_news || projects_mediakits_initial_items >= itemsMax_news) {
			$('#projects-mediakits__btn-plus').hide();
		}
		$projects__mediakits__row.isotope('layout');
	}
	$('#projects-mediakits__btn-plus').on('click', function (e) {
		e.preventDefault();
		projects_mediakits_showNextItems(projects_mediakits_next_items);
	});
	projects_mediakits_hideItems(projects_mediakits_initial_items);
});


$(document).ready(function() {
	$(".events-mediakits__video-btn, .events-mediakits__video-img").click(function () {
		$('.events-mediakits__video-btn, .events-mediakits__video-img').addClass("hide");
	});
});

var swiper = new Swiper(".trust-mediakits__swiper", {
	slidesPerView: '2',
	navigation: {
		prevEl: ".trust-mediakits__swiper-btn-prev",
		nextEl: ".trust-mediakits__swiper-btn-next",
	},
	breakpoints: {
		769: {
			slidesPerView: "4",
		}
	}
});



