$('#snoring-table').DataTable({
	data: tableDataArray,
	columns: [
			{ title: "pi_id" },
			{ title: "date_time" },
			{ title: "decibels" }
	]
});

window.onload = function() {
	var socket = io.connect();

	socket.on('snoreDataUpdate', function(dataPoint) {
		// Received data update from socket connection
		updateAllDataArrays(dataPoint);
		updateChart($('#currentSetting')[0].text);
	});

	window.onbeforeunload = function(e) {
	  socket.disconnect();
	};

	if (Cookies.get('currentDevice') === undefined) {
		Cookies.set('currentDevice', nodeArray[0], {
			expires: 7
		});
	}
	$('#currentDevice').text(Cookies.get('currentDevice'));

	for (var i = 0; i < nodeArray.length; i++) {
		var $input = $('<li><a href="#">' + nodeArray[i] + '</a></li>');
		$input.appendTo($(".device-group"));
	}

	$(".dropdown dt a").click(function(e) {
		$(".dropdown dd ul").toggle();
		e.preventDefault();
	});

	$(".dropdown dd ul li a").click(function(e) {
		var text = $(this).html();

		$(".dropdown dt a span").html(text);
		$(".dropdown dd ul").hide();

		Cookies.set('currentDevice', text);
		console.log(text);
	});

};
