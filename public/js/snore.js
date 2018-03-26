const DEVICE_COOKIE_VALUE = 'currentDevice';

const gaugeOptions = {
	angle: 0.15, // The span of the gauge arc
	lineWidth: 0.44, // The line thickness
	radiusScale: 1, // Relative radius
	pointer: {
		length: 0.6, // // Relative to gauge radius
		strokeWidth: 0.035, // The thickness
		color: '#000000' // Fill color
	},
	limitMax: false, // If false, max value increases automatically if value > maxValue
	limitMin: false, // If true, the min value of the gauge will be fixed
	colorStart: '#6FADCF', // Colors
	colorStop: '#8FC0DA', // just experiment with them
	strokeColor: '#E0E0E0', // to see which ones work best for you
	generateGradient: true,
	highDpiSupport: true, // High resolution support
};

window.onload = function() {
	if (Cookies.get(DEVICE_COOKIE_VALUE) === undefined) {
		Cookies.set(DEVICE_COOKIE_VALUE, nodeArray[0], {
			expires: 7
		});
	}

	var socket = io.connect();
	socket.on('snoreDataUpdate', function(dataPoint) {
		// Received data update from socket connection
		if (dataPoint.pi_ID == Cookies.get(DEVICE_COOKIE_VALUE) || Cookies.get(DEVICE_COOKIE_VALUE) == "totalSnoreObject") {
			updateStats(dataPoint);
		}
		updateDataTable(dataPoint);
	});
	window.onbeforeunload = function(e) {
		socket.disconnect();
		Cookies.set(DEVICE_COOKIE_VALUE, nodeArray[0], {
			expires: 7
		});
	};

	$('#snoring-table').DataTable({
		data: tableDataArray,
		columns: [{
				title: "Device Identifier"
			},
			{
				title: "Date/Time of occurence"
			},
			{
				title: "Decibel Level"
			}
		]
	});



	$('#current-device').text(Cookies.get(DEVICE_COOKIE_VALUE));

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
		if (text.indexOf("All") !== -1) {
			// $("#snoring-table_filter > label > input[type=\"search\"]").val("");
			// $("#snoring-table_filter > label > input[type=\"search\"]").trigger(jQuery.Event('keypress', { keycode: 32 }));
			Cookies.set(DEVICE_COOKIE_VALUE, "totalSnoreObject");
		} else {
			// $("#snoring-table_filter > label > input[type=\"search\"]").val(text);
			// $("#snoring-table_filter > label > input[type=\"search\"]").trigger(jQuery.Event('keypress', { keycode: 32 }));
			Cookies.set(DEVICE_COOKIE_VALUE, text);
		}
		updateStats();
	});

	updateStats();
};

function updateDataTable(dataPoint) {
	tableDataArray.push([dataPoint.pi_ID, dataPoint.date_time, dataPoint.decibels])
	$("#snoring-table").DataTable().destroy()
	$('#snoring-table').DataTable({
		data: tableDataArray,
		columns: [{
				title: "Device Identifier"
			},
			{
				title: "Date/Time of occurence"
			},
			{
				title: "Decibel Level"
			}
		]
	});
}

function updateStats(dataPoint) {
	if (dataPoint !== undefined) {
		snoreStatsArray[dataPoint.pi_ID].countSnoreLastHour++;
		snoreStatsArray[dataPoint.pi_ID].countSnoreLastDay++;
		snoreStatsArray[dataPoint.pi_ID].countSnoreLastWeek++;

		snoreStatsArray.totalSnoreObject.countSnoreLastHour++;
		snoreStatsArray.totalSnoreObject.countSnoreLastDay++;
		snoreStatsArray.totalSnoreObject.countSnoreLastWeek++;

		if (snoreStatsArray[dataPoint.pi_ID].loudestSnore < dataPoint.decibels) {
			snoreStatsArray[dataPoint.pi_ID].loudestSnore = dataPoint.decibels.toFixed(2);
		}

		if (snoreStatsArray.totalSnoreObject.loudestSnore < dataPoint.decibels) {
			snoreStatsArray.totalSnoreObject.loudestSnore = dataPoint.decibels.toFixed(2);
		}
	}

	$(".snore-hour-preview").text(snoreStatsArray[Cookies.get(DEVICE_COOKIE_VALUE)].countSnoreLastHour);
	$(".snore-day-preview").text(snoreStatsArray[Cookies.get(DEVICE_COOKIE_VALUE)].countSnoreLastDay);
	$(".snore-week-preview").text(snoreStatsArray[Cookies.get(DEVICE_COOKIE_VALUE)].countSnoreLastWeek);
	$(".loudest-snore-preview").text(snoreStatsArray[Cookies.get(DEVICE_COOKIE_VALUE)].loudestSnore);

	$("#hour-progress").percircle({
		text: snoreStatsArray[Cookies.get(DEVICE_COOKIE_VALUE)].countSnoreLastHour.toString(),
		percent: 100,
		progressBarColor: "#66CCFF"
	});

	$("#day-progress").percircle({
		text: snoreStatsArray[Cookies.get(DEVICE_COOKIE_VALUE)].countSnoreLastDay.toString(),
		percent: 100,
		progressBarColor: "#3366CC"
	});

	$("#week-progress").percircle({
		text: snoreStatsArray[Cookies.get(DEVICE_COOKIE_VALUE)].countSnoreLastWeek.toString(),
		percent: 100,
		progressBarColor: "#6699FF"
	});

	$("#snore-count").percircle({
		text: snoreStatsArray[Cookies.get(DEVICE_COOKIE_VALUE)].loudestSnore.toString(),
		percent: 100,
		progressBarColor: "#003399"
	});
}
