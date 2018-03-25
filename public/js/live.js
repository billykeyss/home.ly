function updateDataValues(dataPoint) {
	lastDataItemArray[Cookies.get('currentDevice')].humidity = humidity;
	lastDataItemArray[Cookies.get('currentDevice')].pressure = pressure;
	lastDataItemArray[Cookies.get('currentDevice')].temperature = temperature;

	console.log(lastDataItemArray);

	if(dataPoint.type = Cookies.get('currentDevice')) {
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
	window.humidityGauge.set(lastDataItemArray.find(i => i.pi_id === Cookies.get('currentDevice')).humidity); // set actual value
	window.temperatureGauge.set(lastDataItemArray.find(i => i.pi_id === Cookies.get('currentDevice')).temperature); // set actual value
	window.humidityGauge.set(lastDataItemArray.find(i => i.pi_id === Cookies.get('currentDevice')).pressure); // set actual value
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
	window.humidityGauge.set(lastDataItemArray[Cookies.get('currentDevice')].humidity); // set actual value
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
	window.pressureGauge = new Gauge(document.getElementById('pressure-gauge')).setOptions(pressureOpts); // create sexy gauge!
	window.pressureGauge.setTextField(document.getElementById("pressure-textfield"));
	window.pressureGauge.maxValue = 100; // set max gauge value
	window.pressureGauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
	window.pressureGauge.animationSpeed = 32; // set animation speed (32 is default value)
	window.pressureGauge.set(lastDataItemArray[Cookies.get('currentDevice')].pressure); // set actual value
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
	window.temperatureGauge.set(lastDataItemArray[Cookies.get('currentDevice')].temperature); // set actual value
}

window.onload = function() {
	var socket = io.connect();

	socket.on('homeDataUpdate', function(dataPoint) {
		// Received data update from socket connection
		updateDataValues(dataPoint);
	});

	window.onbeforeunload = function(e) {
	  socket.disconnect();
	};


	buildTemperatureGauge();
	buildPressureGauge();
	buildHumidityGauge();

	if (Cookies.get('currentDevice') === undefined) {
		Cookies.set('currentDevice', nodeArray[0], {
			expires: 7
		});
	}

	$('#currentDevice').text(Cookies.get('currentDevice'));

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

		Cookies.set('currentDevice', text);
		refreshValuesDeviceUpdate();
	});

};
