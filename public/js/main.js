var socket = io.connect();

socket.on('homeDataUpdate', function(dataPoint) {
	// Received data update from socket connection
	updateAllDataArrays(dataPoint);
	updateDataValues(dataPoint);
	updateChart($('#currentSetting')[0].text);
});

function updateDataValues(dataPoint) {
	$('#lastPressureReading').text(dataPoint.pressure.toFixed(2));
	$('#lastTemperatureReading').text(dataPoint.pressure.toFixed(2));
	$('#lastHumidityReading').text(dataPoint.pressure.toFixed(2));
}

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
	var ctx1 = document.getElementById("myChart").getContext("2d");
	if (text.indexOf("Day") !== -1) {
		buildChart(ctx1, buildChartData(lastDayDataArray, "simNodeDevice"));
	} else if (text.indexOf("Week") !== -1) {
		buildChart(ctx1, buildChartData(lastWeekDataArray, "simNodeDevice"));
	} else if (text.indexOf("Month") !== -1) {
		buildChart(ctx1, buildChartData(lastMonthDataArray, "simNodeDevice"));
	} else if (text.indexOf("Time") !== -1) {
		buildChart(ctx1, buildChartData(dataArray, "simNodeDevice"));
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

	window.myChart = new Chart(ctx, {
		type: 'line',
		data: chartData,
		options: {
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
			}
		}
	});

	window.myChart.update();
}

$(".dropdown dt a").click(function(e) {
	$(".dropdown dd ul").toggle();
	e.preventDefault();
});

$(".dropdown dd ul li a").click(function() {
	var text = $(this).html();
	$(".dropdown dt a span").html(text);
	$(".dropdown dd ul").hide();
	updateChart(text);
});

$(document).bind('click', function(e) {
	var $clicked = $(e.target);
	if (!$clicked.parents().hasClass("dropdown"))
		$(".dropdown dd ul").hide();
});

window.onload = function() {
	var ctx1 = document.getElementById("myChart").getContext("2d");
	buildChart(ctx1, buildChartData(dataArray, "simNodeDevice"));
};
