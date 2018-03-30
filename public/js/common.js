const DEVICE_COOKIE_VALUE = 'currentDevice';
const GRAPH_DEVICE_COOKIE_VALUE = 'currentGraphDevice';
var shouldAutoUpdate = true;

$('.toggle').click(function(e) {
  var toggle = this;

  e.preventDefault();

  $(toggle).toggleClass('toggle--on')
         .toggleClass('toggle--off')
         .addClass('toggle--moving');

 	$(".toggle-label").toggleClass("blink-text");

	if($(toggle).hasClass('toggle--on')) {
		shouldAutoUpdate = true;
		// $(toggle).addClass('blink');
	} else {
		shouldAutoUpdate = false;
		// $(toggle).removeClass('blink');
	}

  setTimeout(function() {
    $(toggle).removeClass('toggle--moving');
  }, 200)
});

$(document).bind('click', function(e) {
	var $clicked = $(e.target);
	if (!$clicked.parents().hasClass("dropdown"))
		$(".dropdown dd ul").hide();

	if (!$clicked.parents().hasClass("dropdown1"))
		$(".dropdown1 dd ul").hide();
});
