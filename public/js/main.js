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
  var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss';

	window.myChart = new Chart(ctx1, {
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
};
