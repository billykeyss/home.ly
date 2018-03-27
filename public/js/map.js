window.onload = function() {
	var socket = io.connect();

	socket.on('deviceGPSUpdate', function(dataPoint) {
		// Received data update from socket connection
		updateMapValues(dataPoint);
	});

	window.onbeforeunload = function(e) {
	  socket.disconnect();
	};

	initMap();
};

function updateMapValues(dataPoint) {
	console.log(dataPoint);
};

function initMap() {
	var map = L.map('map').setView([lastDataItemArray[0].longitude, lastDataItemArray[0].latitude], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoiZXRoYW5zbWl0aDk1NiIsImEiOiJjamY5emRwZXQyOGFvMndwZGV1cDhzaGI5In0.Plu-LWqwjyI7V4txqqYYNA'
	}).addTo(map);

	for (var i in lastDataItemArray) {
		L.marker([lastDataItemArray[i].longitude, lastDataItemArray[i].latitude]).addTo(map)
				.bindPopup(lastDataItemArray[i].pi_id)
				.openPopup();
	}
}
