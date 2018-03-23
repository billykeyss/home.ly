'use strict';

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({
		path: './config.env'
	});
}

const express = require('express');
const config = require('./config/config');
const Data = require('./app/models/data');
const EventHubClient = require('azure-event-hubs').Client;
const connectionString = process.env.CONN_STRING;
const moment = require('moment');
const app = express();

module.exports = require('./config/express')(app, config);

const server = app.listen(config.port, () => {
	console.log('Express server listening on port ' + config.port);
});

var sock = require('socket.io');
var io = sock.listen(server);

var client = EventHubClient.fromConnectionString(connectionString);
client.open()
	.then(client.getPartitionIds.bind(client))
	.then(function(partitionIds) {
		return partitionIds.map(function(partitionId) {
			return client.createReceiver('$Default', partitionId, {
				'startAfterTime': Date.now()
			}).then(function(receiver) {
				console.log('Created partition receiver: ' + partitionId)
				receiver.on('errorReceived', function(err) {
					console.log(err.message);
				});
				receiver.on('message', function(message) {
					var data = message.body;
					let dateTime = data.date_time;
					data.date_time = moment(dateTime * 1000).format("dddd, MMMM Do YYYY, H:mm:ss")
					if (data.type == 'snore') {
						// Data.addSnoreDataDirectDB(data);
						io.sockets.emit('snoreDataUpdate', data);
					} else if (data.type == 'home') {
						// Data.addDataDirectDB(data);
						io.sockets.emit('homeDataUpdate', data);
					};
				})
			});
		});
	})
	.catch(function(err) {
		console.log(err.message);
	});
