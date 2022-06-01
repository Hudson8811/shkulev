/* ---------news-------------------news--------------------------news------------------ */



							const windowInnerWidthNews = window.innerWidth;
							if (windowInnerWidthNews < 769) {
								var news_initial_items = 3;
								var news_next_items = 2;
							} else {
								var news_initial_items = 8;
								var news_next_items = 4;
							}

							var $news__items = $('#news__items').isotope({
								itemSelector: '.news__item',
								layoutMode: 'fitRows',
								stamp: '.news__item--static'
							});

							$('.news__btns-filter').on('click', 'button', function () {
								var news_value = $(this).attr('data-filter');
								$news__items.isotope({filter: news_value});
								news_updateFilterCounts();
							});
							function news_updateFilterCounts() {
								var itemElems_news = $news__items.isotope('getFilteredItemElements');
								var count_items_news = $(itemElems_news).length;
							
								if (count_items_news > news_initial_items) {
									$('#news__btn-plus').show();
								}
								else {
									$('#news__btn-plus').hide();
								}
								if ($('.news__item').hasClass('visible_item')) {
									$('.news__item').removeClass('visible_item');
								}
								var index = 0;
									$(itemElems_news).each(function () {
									if (index >= news_initial_items) {
										$(this).addClass('visible_item');
									}
									index++;
								});
								$news__items.isotope('layout');
							}
							$('.news__btns-filter').each(function (i, buttonGroup) {
								var $buttonGroup = $(buttonGroup);
								$buttonGroup.on('click', 'button', function () {
									$buttonGroup.find('.active').removeClass('active');
									$(this).addClass('active');
								});
							});

							function news_showNextItems(pagination) {
								var itemsMax_news = $('.visible_item').length;
								var itemsCount = 0;
								$('.visible_item').each(function () {
									if (itemsCount < pagination) {
										$(this).removeClass('visible_item');
										itemsCount++;
									}
								});
								if (itemsCount >= itemsMax_news) {
									$('#news__btn-plus').hide();
								}
								$news__items.isotope('layout');
							}
							function news_hideItems(pagination) {
								var itemsMax_news = $('.news__item').length;
								var itemsCount = 0;
								$('.news__item').each(function () {
									if (itemsCount >= pagination) {
										$(this).addClass('visible_item');
									}
									itemsCount++;
								});
								if (itemsCount < itemsMax_news || news_initial_items >= itemsMax_news) {
									$('#news__btn-plus').hide();
								}
								$news__items.isotope('layout');
							}
							$('#news__btn-plus').on('click', function (e) {
								e.preventDefault();
								news_showNextItems(news_next_items);
							});
							news_hideItems(news_initial_items);

							



							const sec3_news_page__video_btn = document.querySelector('.sec3-news-page__video-btn');
							const sec3_news_page__video_img = document.querySelector('.sec3-news-page__video-img');
							
							sec3_news_page__video_btn.addEventListener("click", function(e) {
								sec3_news_page__video_btn.classList.add('hide');
								sec3_news_page__video_img.classList.add('hide');
							});

















