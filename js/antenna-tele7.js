var swiper = new Swiper(".antenna-tele7-slider__container", {
	navigation: {
		nextEl: ".antenna-tele7-slider__arrow-next",
		prevEl: ".antenna-tele7-slider__arrow-prev",
	},
	loop: true,
});
$(document).ready(function() {
	$('.accordion__click-to-show').click(function(event) {
		$(this).toggleClass('_active').next().slideToggle(0);
	});
}); 
$('#antenna-tele7-contacts__btn-plus').click(function () {
	$('.antenna-tele7-contacts__row .contacts__body:hidden').show(300);
	$('.antenna-tele7-contacts__row .contacts__body:hidden').length < 1 ? $('#antenna-tele7-contacts__btn-plus').hide() : false;
});