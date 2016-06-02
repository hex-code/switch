(function() {

	// var -------------------------------------------------------------------------------------------- //
	var _body = $('body');



	// start! ----------------------------------------------------------------------------------------- //
	window.addEventListener && window.addEventListener('DOMContentLoaded', function(){
		document.body.className += ' dom-loaded';
	});

	// show site -------------------------------------------------------------------------------------- //
	window.addEventListener && window.addEventListener('load', function(){
		document.body.className += ' loaded';
	});

	// init Isotope
	var $grid = $('.grid').isotope({
		itemSelector: '.element-item',
		layoutMode: 'fitRows',
		getSortData: {
			first: '[data-num]',
			type: '[data-relevant]',
			universal: '[data-universal]',
			number: '.number parseInt'
		},
 		filter: '.show'
	});
	// bind sort button click
	var	i = 0;
	$('.button').on( 'click', function() {
		var	_this = $(this),
			type = _this.closest('.element-item').attr('data-type'),
			items = $('.element-item'),
			clickedBut = _this.closest('.element-item'),
			selectedType = items.filter('.highlited').eq(0).attr('data-type');
		if (_this.closest('.element-item').hasClass('hidden')) {
			return;
		}
		if ( _this.closest('.element-item').hasClass('additional') ) {
			$grid.isotope({filter: '.show, .additional'})
		}
		if (items.filter('.active').length === 0) {
			items.removeClass('hidden');
			items.each(function() {
				var _this = $(this);
				//_this.attr('data-num', '1');
				_this.attr('data-relevant', '1');
				if ( _this.closest('.element-item').attr('data-type') === type || _this.attr('data-universal') === 'true' ) {
					_this.attr('data-relevant', '0');
				} else {
					_this.addClass('irrelevant');
				}
			});
		} else {
			_this.closest('.element-item').addClass('active');
		}
		setTimeout(function() {
			items.each(function() {
				var _this = $(this);
				_this.filter('.irrelevant').removeClass('irrelevant').addClass('hidden');
			});
		}, 500);
		// if (type !== selectedType) {
		// 	items.each(function() {
		// 		var _this = $(this);
		// 		_this.attr('data-num', 1);
		// 	})
		// }
		if ( items.filter('.highlited').length > 0 && !( _this.closest('.element-item').hasClass('highlited') ) ) {
			i += 0.01;
			clickedBut.attr('data-num', i).addClass('active highlited').siblings().removeClass('active');
		} else if (items.filter('.highlited').length === 0) {
			i -= 0.01;
			clickedBut.attr('data-num', i).addClass('active highlited').siblings().removeClass('active');
		}
		$grid
		// update sort data on changed items
		.isotope('updateSortData')
		// trigger layout and sort
		.isotope({sortBy: ['first', 'type'] });
	});
	$('.close-button').on('click', function() {
		i = 0;
		var _this = $(this),
			items = $('.element-item'),
			item = _this.closest('.element-item');
		if ( item.hasClass('active') ) {
			item.removeClass('active');
		}
		item.removeClass('highlited').attr('data-num', 1);
		if (item.hasClass('additional')) {
			$grid.isotope('updateSortData').isotope({sortBy: 'first', filter: ".show"});
		} else {
			$grid.isotope('updateSortData').isotope({sortBy: 'first'});
		}
		if ( items.filter('.highlited').length === 0 ) {
			items.removeClass('hidden');
			$grid.isotope({ sortBy: 'original-order', filter: '.show' });
		}
	});
})();