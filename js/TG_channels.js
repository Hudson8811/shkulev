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
	$(this).toggleClass('active').next().slideToggle(0);
});
						