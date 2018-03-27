const DEVICE_COOKIE_VALUE = 'currentDevice';

function updateDataValues(dataPoint) {
	lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].humidity = dataPoint.humidity;
	lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].pressure = dataPoint.pressure;
	lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].temperature = dataPoint.temperature;

	if(dataPoint.pi_ID == Cookies.get(DEVICE_COOKIE_VALUE)) {
		let pressure = dataPoint.pressure.toFixed(2);
		let humidity = dataPoint.humidity.toFixed(2);
		let temperature = dataPoint.temperature.toFixed(2);

		window.pressureGauge.set(pressure);
		window.temperatureGauge.set(temperature);
		window.humidityGauge.set(humidity);

		$("#pressure-preview").text(pressure);
		$("#temperature-preview").text(temperature);
		$("#humidity-preview").text(humidity);
	}
}

function refreshValuesDeviceUpdate() {
	window.humidityGauge.set(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].humidity); // set actual value
	window.temperatureGauge.set(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].temperature); // set actual value
	window.pressureGauge.set(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].pressure); // set actual value

	$("#pressure-preview").text(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].pressure);
	$("#temperature-preview").text(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].temperature);
	$("#humidity-preview").text(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].humidity);
}

function buildHumidityGauge() {
	var humidityOpts = {
	  angle: -0.2,
	  lineWidth: 0.1,
	  radiusScale: 1,
	  pointer: {
	    length: 0.6,
	    strokeWidth: 0.035,
	    color: '#000000'
	  },
		staticLabels: {
			font: "10px sans-serif",
			labels: [10, 30, 50, 90],
			color: "#ffffff",
			fractionDigits: 0
		},
		staticZones: [
			 {strokeStyle: "#F03E3E", min: 0, max: 10},
			 {strokeStyle: "#FFDD00", min: 10, max: 30},
			 {strokeStyle: "#30B32D", min: 30, max: 50},
			 {strokeStyle: "#FFDD00", min: 50, max: 90},
			 {strokeStyle: "#F03E3E", min: 90, max: 100}
		],
	  limitMax: false,
	  limitMin: false,
	  colorStart: '#6F6EA0',
	  colorStop: '#C0C0DB',
	  strokeColor: '#EEEEEE',
	  generateGradient: true,
	  highDpiSupport: true,
	};
	window.humidityGauge = new Gauge(document.getElementById('humidity-gauge')).setOptions(humidityOpts); // create sexy gauge!
	window.humidityGauge.setTextField(document.getElementById("humidity-textfield"));
	window.humidityGauge.maxValue = 100; // set max gauge value
	window.humidityGauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
	window.humidityGauge.animationSpeed = 32; // set animation speed (32 is default value)
	window.humidityGauge.set(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].humidity); // set actual value
}

function buildPressureGauge() {
	var pressureOpts = {
		angle: -0.2,
	  lineWidth: 0.1,
	  radiusScale: 1,
	  pointer: {
	    length: 0.6,
	    strokeWidth: 0.035,
	    color: '#000000'
	  },
		staticLabels: {
			font: "10px sans-serif",
			labels: [20, 60, 90, 110, 140, 180],
			color: "#ffffff",
			fractionDigits: 0
		},
		staticZones: [
			 {strokeStyle: "#F03E3E", min: 20, max: 60},
			 {strokeStyle: "#FFDD00", min: 60, max: 95},
			 {strokeStyle: "#30B32D", min: 95, max: 115},
			 {strokeStyle: "#FFDD00", min: 115, max: 140},
			 {strokeStyle: "#F03E3E", min: 140, max: 180}
		],
		limitMax: false,
	  limitMin: false,
	  colorStart: '#6F6EA0',
	  colorStop: '#C0C0DB',
	  strokeColor: '#EEEEEE',
	  generateGradient: true,
	  highDpiSupport: true,

	};
	window.pressureGauge = new Gauge(document.getElementById('pressure-gauge')).setOptions(pressureOpts); // create sexy gauge!
	window.pressureGauge.setTextField(document.getElementById("pressure-textfield"));
	window.pressureGauge.maxValue = 180; // set max gauge value
	window.pressureGauge.setMinValue(20);  // Prefer setter over gauge.minValue = 0
	window.pressureGauge.animationSpeed = 32; // set animation speed (32 is default value)
	window.pressureGauge.set(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].pressure); // set actual value
}

function buildTemperatureGauge() {
	var temperatureOpts = {
		angle: -0.2,
	  lineWidth: 0.1,
	  radiusScale: 1,
	  pointer: {
	    length: 0.6,
	    strokeWidth: 0.035,
	    color: '#000000'
	  },
		staticLabels: {
			font: "10px sans-serif",
			labels: [0, 10, 20, 30, 40, 60],
			color: "#ffffff",
			fractionDigits: 0
		},
		staticZones: [
			 {strokeStyle: "#2980B9", min: 0, max: 10},
			 {strokeStyle: "#009acd", min: 10, max: 20},
			 {strokeStyle: "#30B32D", min: 20, max: 30},
			 {strokeStyle: "#FFDD00", min: 30, max: 40},
			 {strokeStyle: "#F03E3E", min: 40, max: 60}
		],
		limitMax: false,
	  limitMin: false,
	  colorStart: '#6F6EA0',
	  colorStop: '#C0C0DB',
	  strokeColor: '#EEEEEE',
	  generateGradient: true,
	  highDpiSupport: true,
	};
	window.temperatureGauge = new Gauge(document.getElementById('temperature-gauge')).setOptions(temperatureOpts); // create sexy gauge!
	window.temperatureGauge.maxValue = 60; // set max gauge value
	window.temperatureGauge.setTextField(document.getElementById("temperature-textfield"));
	window.temperatureGauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
	window.temperatureGauge.animationSpeed = 32; // set animation speed (32 is default value)
	window.temperatureGauge.set(lastDataItemArray[Cookies.get(DEVICE_COOKIE_VALUE)].temperature); // set actual value
}

window.onload = function() {
	var socket = io.connect();

	socket.on('homeDataUpdate', function(dataPoint) {
		// Received data update from socket connection
		if(Cookies.get("autoUpdate") === "true") {
			updateDataValues(dataPoint);
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

	buildTemperatureGauge();
	buildPressureGauge();
	buildHumidityGauge();
	refreshValuesDeviceUpdate();

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
		refreshValuesDeviceUpdate();
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
