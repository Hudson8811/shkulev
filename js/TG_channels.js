//click-add
/* z */

$(".channels-block__btn-show").click(function () {
	$(this).toggleClass("active").next().slideToggle(0);
});
$(".card__body-close").click(function () {
	$(this).closest('.card__body').slideUp(0);
});




//RADIO
$(document).ready(function () {
	$.each($('.radiobuttons__item'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$(document).on('click', '.radiobuttons__item', function (event) {
		$(this).parents('.radiobuttons').find('.radiobuttons__item').removeClass('active');
		$(this).parents('.radiobuttons').find('.radiobuttons__item input').prop('checked', false);
		$(this).toggleClass('active');
		$(this).find('input').prop('checked', true);
		return false;
	});
});

