var TIME_SETTING = 0; //0: all time, 1: last hour, 2: last day, 3: last week

window.onload = function() {
  if (Cookies.get(DEVICE_COOKIE_VALUE) === undefined) {
    Cookies.set(DEVICE_COOKIE_VALUE, "totalSnoreObject", {
      expires: 7
    });
  }

  Cookies.set(GRAPH_DEVICE_COOKIE_VALUE, nodeArray[0], {
    expires: 7
  });

  Cookies.set(DEVICE_COOKIE_VALUE, nodeArray[0], {
    expires: 7
  });

  var socket = io.connect();
  socket.on('snoreDataUpdate', function(dataPoint) {
    // Received data update from socket connection
    $("#sliderSwitch").prop("checked", true);

    updateChartData(dataPoint);
    updateStats(dataPoint);
    if (shouldAutoUpdate) {
      if (dataPoint.pi_ID == Cookies.get(DEVICE_COOKIE_VALUE) || Cookies.get(DEVICE_COOKIE_VALUE) == "totalSnoreObject") {
        updateVisualStats();
      }
      if(dataPoint.pi_ID == Cookies.get(GRAPH_DEVICE_COOKIE_VALUE)) {
        updateChart(dataPoint);
      }
    }
    updateDataTable(dataPoint);
  });

  socket.on('snoreConnectionUpdate', function(connected) {
    console.log(connected);
    $("#sliderSwitch").prop("checked", !connected);
  });

  var ctx1 = document.getElementById("data-chart").getContext("2d");
  buildChart(ctx1, buildChartData(graphDataArray[TIME_SETTING], Cookies.get(GRAPH_DEVICE_COOKIE_VALUE)));

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
        title: "Decibels Level"
      },
      {
        title: "Max Decibels"
      }
    ]
  });

  $('#current-device').text(Cookies.get(DEVICE_COOKIE_VALUE));
  $('#current-graph-device').text(Cookies.get(DEVICE_COOKIE_VALUE));

  for (var i = 0; i < nodeArray.length; i++) {
    var $input = $('<li><a href="#">' + nodeArray[i] + '</a></li>');
    $input.appendTo($(".device-group"));
    $input.appendTo($(".graph-device-group"));
  }

  updateStats();
  updateVisualStats();
  $("#sliderSwitch").prop("checked", false);

};

function updateDataTable(dataPoint) {
  tableDataArray.push([dataPoint.pi_ID, dataPoint.date_time, roundArrayTwoDecimal(dataPoint.decibel_array).toString(), dataPoint.max_decibels]);
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
        title: "Decibels Level"
      },
      {
        title: "Max Decibels"
      }
    ]
  });
}

function updateStats(dataPoint) {
  if (dataPoint !== undefined && dataPoint.max_decibels > 10) {
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
}

function updateVisualStats() {
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

function roundArrayTwoDecimal(array) {
  var x = 0;
  var len = array.length
  while (x < len) {
    array[x] = array[x].toFixed(2);
    x++;
  }
  return array;
}

function buildChart(ctx, chartData) {
  var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss:SS';
  window.dataChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            format: timeFormat,
            // round: 'day'
            tooltipFormat: 'll HH:mm:ss:SS'
          },
          scaleLabel: {
            display: true
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 50,
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

function buildChartData(data, key) {
  // Line Chart
  var lineChartData = {
    labels: data[key].labels,
    datasets: [{
      label: "Pressure",
      borderColor: [
        "rgb(48,179,45)"
      ],
      backgroundColor: [
        "rgb(48,179,45, 0.0)"
      ],
      data: data[key].decibels,
    }]
  };
  return lineChartData;
}

function updateChart(dataPoint) {
  var ctx1 = document.getElementById("data-chart").getContext("2d");
  buildChart(ctx1, buildChartData(graphDataArray[TIME_SETTING], Cookies.get(GRAPH_DEVICE_COOKIE_VALUE)));
}

function updateChartData(dataPoint) {
  dataPoint.decibel_array.forEach(function (decibel, index) {
    console.log(dataPoint.date_time + index * 0.5)
    for(var j = 0; j < 4; j++) {
      graphDataArray[j][dataPoint.pi_ID].labels.push(convertUnixToMomentStringSnoreGraph(dataPoint.date_time + index * 0.5));
      graphDataArray[j][dataPoint.pi_ID].decibels.push(decibel)
    }
  });
}

function convertUnixToMomentStringSnoreGraph(unix) {
		return moment(unix * 1000).utcOffset('-0400').format("dddd, MMMM Do YYYY, H:mm:ss:SS");
}

function updateChartTimeChange(text) {
  	var ctx1 = document.getElementById("data-chart").getContext("2d");
  	if (text.indexOf("Hour") !== -1) {
      TIME_SETTING = 1;
  	} else if (text.indexOf("Day") !== -1) {
      TIME_SETTING = 2;
  	} else if (text.indexOf("Week") !== -1) {
      TIME_SETTING = 3;
  	} else if (text.indexOf("Time") !== -1) {
      TIME_SETTING = 0;
  	}
    buildChart(ctx1, buildChartData(graphDataArray[TIME_SETTING], Cookies.get(DEVICE_COOKIE_VALUE)));
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
    Cookies.set(DEVICE_COOKIE_VALUE, "totalSnoreObject");
  } else {
    Cookies.set(DEVICE_COOKIE_VALUE, text);
  }
  updateStats();
  updateVisualStats();
});


$(".dropdown1 dt a").click(function(e) {
  $(".dropdown1 dd ul").toggle();
  e.preventDefault();
});

$(".dropdown1 dd ul li a").click(function(e) {
  var text = $(this).html();

  $(".dropdown1 dt a span").html(text);
  $(".dropdown1 dd ul").hide();
  Cookies.set(GRAPH_DEVICE_COOKIE_VALUE, text);
});

$(".dropdown2 dt a").click(function(e) {
  $(".dropdown2 dd ul").toggle();
  e.preventDefault();
});

$(".dropdown2 dd ul li a").click(function(e) {
  var text = $(this).html();

  $(".dropdown2 dt a span").html(text);
  $(".dropdown2 dd ul").hide();
  updateChartTimeChange(text);
});
