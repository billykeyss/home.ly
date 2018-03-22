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


function getSelectedValue(id) {
	return $("#" + id).find("dt a span.value").html();
}
$("button").click(function(e) {
	var val = getSelectedValue('countries');
	alert(val);
});

$(".dropdown dt a").click(function(e) {
	$(".dropdown dd ul").toggle();
	e.preventDefault();
});

$(".dropdown dd ul li a").click(function() {
	var text = $(this).html();
	$(".dropdown dt a span").html(text);
	$(".dropdown dd ul").hide();


  var ctx1 = document.getElementById("myChart").getContext("2d");
	ctx1.height = 1800;
	var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss';


	if (text.includes("Day")) {
    console.log('day chart');
    let chartData = buildChartData(lastDayDataArray, "simNodeDevice");
    buildChart(ctx1, chartData);
	} else if (text.includes("Week")) {
    console.log("week chart");
    let chartData = buildChartData(lastWeekDataArray, "simNodeDevice");
    buildChart(ctx1, chartData);
	} else if (text.includes("Month")) {
    let chartData = buildChartData(lastMonthDataArray, "simNodeDevice");
    buildChart(ctx1, chartData);
  } else if (text.includes('Time')) {
    let chartData = buildChartData(dataArray, "simNodeDevice");
    buildChart(ctx1, chartData);
	}

});

$(document).bind('click', function(e) {
	var $clicked = $(e.target);
	if (!$clicked.parents().hasClass("dropdown"))
		$(".dropdown dd ul").hide();
});
