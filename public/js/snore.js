$('#snoring-table').DataTable({
	data: tableDataArray,
	columns: [
			{ title: "Device Identifier" },
			{ title: "Date/Time of occurence" },
			{ title: "Decibel Level" }
	]
});

window.onload = function() {
	var socket = io.connect();

	socket.on('snoreDataUpdate', function(dataPoint) {
		// Received data update from socket connection
	});

	window.onbeforeunload = function(e) {
	  socket.disconnect();
	};

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
		if(text.indexOf("All") !== -1) {
			$("#snoring-table_filter > label > input[type=\"search\"]").val("");
			$("#snoring-table_filter > label > input[type=\"search\"]").trigger(jQuery.Event('keypress', { keycode: 32 }));
		} else {
			$("#snoring-table_filter > label > input[type=\"search\"]").val(text);
			$("#snoring-table_filter > label > input[type=\"search\"]").trigger(jQuery.Event('keypress', { keycode: 32 }));
		}
	});

};
