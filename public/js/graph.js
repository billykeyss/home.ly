window.onload = function() {
	var socket = io.connect();

	socket.on('homeDataUpdate', function(dataPoint) {
		// Received data update from socket connection
		updateAllDataArrays(dataPoint);
		if(shouldAutoUpdate && dataPoint.pi_ID == Cookies.get(DEVICE_COOKIE_VALUE)) {
			updateChart($('#current-setting')[0].text);
		}
	});

	window.onbeforeunload = function(e) {
	  socket.disconnect();
	};

	if (Cookies.get(DEVICE_COOKIE_VALUE) === undefined) {
		Cookies.set(DEVICE_COOKIE_VALUE, nodeArray[0], {
			expires: 7
		});
	}

	var ctx1 = document.getElementById("data-chart").getContext("2d");
	buildChart(ctx1, buildChartData(dataArray, Cookies.get(DEVICE_COOKIE_VALUE)));

	$('#current-device').text(Cookies.get(DEVICE_COOKIE_VALUE));
	updateChart($('#current-setting')[0].text);

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
};


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
	var greenStatus = "rgb(48,179,45)";
	var greenStatusBackground = "rgb(48,179,45, 0.0)";
	var yellowStatus = "rgb(253,216,49)";
	var yellowStatusBackground = "rgb(253,216,49,0.0)";
	var redStatus = "rgb(240,62,62)";
	var redStatusBackground = "rgb(240,62,62,0.0)";

	let humidityValue = data[key].humidity[data[key].humidity.length-1];
	let temperatureValue = data[key].temperature[data[key].temperature.length-1];
	let pressureValue = data[key].pressure[data[key].pressure.length-1];

	var humidityBorder = greenStatus;
	var humidityBackground = greenStatusBackground;
	var temperatureBorder = redStatus;
	var temperatureBackground = redStatusBackground;
	var pressureBorder = redStatus;
	var pressureBackground = redStatusBackground;

	if(humidityValue > 30 && humidityValue < 50) {
		humidityBackground = greenStatusBackground;
		humidityBorder = greenStatus;
	} else if ((humidityValue > 50 && humidityValue < 90) || (humidityValue > 10 && humidityValue < 30)) {
		humidityBackground = yellowStatusBackground;
		humidityBorder = yellowStatus;
	} else {
		humidityBackground = redStatusBackground;
		humidityBorder = redStatus;
	}

	if(temperatureValue > 20 && temperatureValue < 30) {
		temperatureBackground = greenStatusBackground;
		temperatureBorder = greenStatus;
	} else if ((temperatureValue > 30 && temperatureValue < 40) || (temperatureValue > 10 && temperatureValue < 20)) {
		temperatureBackground = yellowStatusBackground;
		temperatureBorder = yellowStatus;
	} else {
		temperatureBackground = redStatusBackground;
		temperatureBorder = redStatus;
	}

	if(pressureValue > 90 && pressureValue < 110) {
		pressureBackground = greenStatusBackground;
		pressureBorder = greenStatus;
	} else if ((pressureValue > 110 && pressureValue < 140) || (pressureValue > 60 && pressureValue < 90)) {
		pressureBackground = yellowStatusBackground;
		pressureBorder = yellowStatus;
	} else {
		pressureBackground = redStatusBackground;
		pressureBorder = redStatus;
	}

	// Line Chart
	var lineChartData = {
		labels: data[key].labels,
		datasets: [{
				label: "Humidity",
				borderColor: [
					humidityBorder
				],
				backgroundColor: [
					humidityBackground
				],
				data: data[key].humidity,
				 borderDash: [20,10]
			}, {
				label: "Temperature",
				borderColor: [
					temperatureBorder
				],
				backgroundColor: [
					temperatureBackground
				],
				data: data[key].temperature,
				borderDash: [10,5]
			},
			{
				label: "Pressure",
				borderColor: [
					pressureBorder
				],
				backgroundColor: [
					pressureBackground
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
			legend: {
				display: true,
				labels: {
					fontSize: 24,
					fontFamily: "Work Sans"
				}
			},
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
						beginAtZero: true,
						max: 120,
						min: 0,
						stepSize: 5
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
