var socket = io.connect('http://localhost:3001');

socket.on('homeDataUpdate', function(dataPoint) {
	updateDataArray(dataPoint);
	updateChart($('#currentSetting')[0].text);
});

function getSelectedValue(id) {
	return $("#" + id).find("dt a span.value").html();
}

function updateDataArray(dataPoint) {
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
	ctx1.height = 1800;
	if (text.indexOf("Day") !== -1) {
    let chartData = buildChartData(lastDayDataArray, "simNodeDevice");
    buildChart(ctx1, chartData);
	} else if (text.indexOf("Week") !== -1) {
    let chartData = buildChartData(lastWeekDataArray, "simNodeDevice");
    buildChart(ctx1, chartData);
	} else if (text.indexOf("Month") !== -1) {
    let chartData = buildChartData(lastMonthDataArray, "simNodeDevice");
    buildChart(ctx1, chartData);
  } else if (text.indexOf("Time") !== -1) {
    let chartData = buildChartData(dataArray, "simNodeDevice");
    buildChart(ctx1, chartData);
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

window.onload = function() {
	var ctx1 = document.getElementById("myChart").getContext("2d");
	ctx1.height = 1800;
	let chartData = buildChartData(dataArray, "simNodeDevice");
  buildChart(ctx1, chartData);
};

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
