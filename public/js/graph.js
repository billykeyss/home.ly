const DEVICE_COOKIE_VALUE = 'currentDevice';

function updateAllDataArrays(dataPoint) {
	updateArrayWithDatapoint(lastDayDataArray, dataPoint);
	updateArrayWithDatapoint(lastWeekDataArray, dataPoint);
	updateArrayWithDatapoint(lastMonthDataArray, dataPoint);
	updateArrayWithDatapoint(dataArray, dataPoint);
}

function updateArrayWithDatapoint(array, dataPoint) {
	array[dataPoint.pi_ID].humidity.push(dataPoint.humidity);
	array[dataPoint.pi_ID].pressure.push(dataPoint.pressure);
	array[dataPoint.pi_ID].temperature.push(dataPoint.temperature);
	array[dataPoint.pi_ID].labels.push(dataPoint.date_time);
}

function updateChart(text) {
	var ctx1 = document.getElementById("data-chart").getContext("2d");
	if (text.indexOf("Day") !== -1) {
		buildChart(ctx1, buildChartData(lastDayDataArray, Cookies.get(DEVICE_COOKIE_VALUE)));
	} else if (text.indexOf("Week") !== -1) {
		buildChart(ctx1, buildChartData(lastWeekDataArray, Cookies.get(DEVICE_COOKIE_VALUE)));
	} else if (text.indexOf("Month") !== -1) {
		buildChart(ctx1, buildChartData(lastMonthDataArray, Cookies.get(DEVICE_COOKIE_VALUE)));
	} else if (text.indexOf("Time") !== -1) {
		buildChart(ctx1, buildChartData(dataArray, Cookies.get(DEVICE_COOKIE_VALUE)));
	}
}

function buildChartData(data, key) {
	var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss';

	// Line Chart
	var lineChartData = {
		labels: data[key].labels,
		datasets: [{
				label: "Humidity",
				backgroundColor: [
					'rgba(155, 89, 182, 0.1)'
				],
				borderColor: [
					'rgba(155, 89, 182, 0.9)'
				],
				data: data[key].humidity
			}, {
				label: "Temperature",
				backgroundColor: [
					'rgba(41, 128, 185, 0.1)'
				],
				borderColor: [
					'rgba(41, 128, 185, 0.9)'
				],
				data: data[key].temperature
			},
			{
				label: "Pressure",
				backgroundColor: [
					'rgba(12, 80, 30, 0.1)'
				],
				borderColor: [
					'rgba(12, 100, 40, 0.9)'
				],
				data: data[key].pressure
			}
		]
	};
	return lineChartData;
}

function buildChart(ctx, chartData) {
	var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss';
	window.dataChart = new Chart(ctx, {
		type: 'line',
		data: chartData,
		options: {
			maintainAspectRatio: false,
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						format: timeFormat,
						// round: 'day'
						tooltipFormat: 'll HH:mm'
					},
					scaleLabel: {
						display: true
					}
				}],
				yAxes: [{
					ticks: {
						beginAtZero: true
					},
					scaleLabel: {
						display: true
					}
				}]
			},
			animation: false
		}
	});
	window.dataChart.update();
}

$(".dropdown1 dt a").click(function(e) {
	$(".dropdown1 dd ul").toggle();
	e.preventDefault();
});

$(".dropdown1 dd ul li a").click(function() {
	var text = $(this).html();
	$(".dropdown1 dt a span").html(text);
	$(".dropdown1 dd ul").hide();
	updateChart(text);
});

$(document).bind('click', function(e) {
	var $clicked = $(e.target);
	if (!$clicked.parents().hasClass("dropdown"))
		$(".dropdown dd ul").hide();

	if (!$clicked.parents().hasClass("dropdown1"))
		$(".dropdown1 dd ul").hide();
});

window.onload = function() {
	var socket = io.connect();

	socket.on('homeDataUpdate', function(dataPoint) {
		// Received data update from socket connection
		updateAllDataArrays(dataPoint);
		if(Cookies.get("autoUpdate") === "true") {
			updateChart($('#current-setting')[0].text);
		}
	});

	window.onbeforeunload = function(e) {
	  socket.disconnect();
	};

	var ctx1 = document.getElementById("data-chart").getContext("2d");
	buildChart(ctx1, buildChartData(dataArray, "simNodeDevice"));
	if (Cookies.get(DEVICE_COOKIE_VALUE) === undefined) {
		Cookies.set(DEVICE_COOKIE_VALUE, nodeArray[0], {
			expires: 7
		});
	}
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

		Cookies.set(DEVICE_COOKIE_VALUE, text);
		updateChart($('#current-setting')[0].text);
	});

	if(Cookies.get("autoUpdate") == "true") {
		$('.toggle').addClass('toggle--on');
		$('.toggle').removeClass('toggle--off');
	} else if (Cookies.get("autoUpdate") == "false") {
		$('.toggle').removeClass('toggle--on');
		$('.toggle').addClass('toggle--off');
	} else {
		Cookies.set("autoUpdate", "true");
	}
};

$('.toggle').click(function(e) {
  var toggle = this;

  e.preventDefault();

  $(toggle).toggleClass('toggle--on')
         .toggleClass('toggle--off')
         .addClass('toggle--moving');

	let shouldToggle = Cookies.get("autoUpdate");
	if($(toggle).hasClass("toggle--on")) {
		Cookies.set("autoUpdate", "true");
	} else {
		Cookies.set("autoUpdate", "false");
	}

  setTimeout(function() {
    $(toggle).removeClass('toggle--moving');
  }, 200)
});
