/* ---------news-------------------news--------------------------news------------------ */
					

							const newsFilterBtns = $('.news__btns-filter');
							const newsSwiperItems = $('.news__item');
							const newsFilterBtn = $('.news__btn-filter');
							function newsFilter() {
								newsFilterBtns.on("click", event => {
									const targetId = event.target.getAttribute('data-id')
									const target = $(event.target)
									
									if (target.hasClass('news__btn-filter')) {
										newsFilterBtn.each(function () {
											$(this).removeClass('active');
										})
										target.addClass('active')
									}

									switch (targetId) {
										case 'all':
											getnewsItems('news__item')
											break;
										case 'news-new':
											getnewsItems(targetId)
											break;
										case 'news-meeting':
											getnewsItems(targetId)
											break;
									}
									
								});
							}
							newsFilter()
							function getnewsItems(className) {
								newsSwiperItems.each(function (index, item) {
									if ($(this).hasClass(className)) {
										var that = $(this);
										var news_btn_filter_first = $('.news__btn-filter-first')
										setTimeout(function () {
											that.addClass('activef').show(0);
										}, 0);

									} else {
										var that = $(this);
									
										setTimeout(function () {
											that.removeClass('activef').hide(0);
										}, 0);
									}
								});
							}

							const news_btn_filter_first = document.querySelector('.news__btn-filter-first');
							const news_item = document.querySelector('.news__item');
							/* if (news_btn_filter_first.contains('active')) {
								for(var i = 0; i < news_item.length; i++){
									news_item[i].addEventListener('click', function(){
										for(var i = 0; i < box.length; i++) {
											box[i].classList.remove('activef');
										}
									});
								}
							} */
							if (true) {
								news_btn_filter_first.addEventListener("click", function(e) {
									for(var i = 0; i < news_item.length; i++){
										news_item[i].classList.remove('activef');
									}
								});
							}
							
























