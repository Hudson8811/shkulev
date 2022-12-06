//click-add
var initial_items = 6;
var next_items = 2;

var $grid = $('.channels-block__items').isotope({
	itemSelector: '.channels-block__item',
	layoutMode: 'masonry',
});

function showNextItems(pagination) {
	var itemsMax = $('.visible_item').length;
	var itemsCount = 0;
	$('.visible_item').each(function () {
		if (itemsCount < pagination) {
			$(this).removeClass('visible_item');
			itemsCount++;
		}
	});
	if (itemsCount >= itemsMax) {
		$('.channels-block__btn-plus').hide();
	}
	$grid.isotope('layout');
}

function hideItems(pagination) {
	var itemsMax = $('.channels-block__item').length;
	var itemsCount = 0;
	$('.channels-block__item').each(function () {
		if (itemsCount >= pagination) {
			$(this).addClass('visible_item');
		}
		itemsCount++;
	});
	if (itemsCount < itemsMax || initial_items >= itemsMax) {
		$('.channels-block__btn-plus').hide();
	}
	$grid.isotope('layout');
}

$('.channels-block__btn-plus').on('click', function (e) {
	e.preventDefault();
	showNextItems(next_items);
});

hideItems(initial_items);


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

