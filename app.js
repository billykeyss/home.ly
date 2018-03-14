'use strict';


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: './config.env'});
}

const express = require('express');
const config = require('./config/config');
const Data = require('./app/models/data');
var EventHubClient = require('azure-event-hubs').Client;
var connectionString = process.env.CONN_STRING;

const app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

var printError = function (err) {
  console.log(err.message);
};

// var client = EventHubClient.fromConnectionString(connectionString);
// client.open()
//     .then(client.getPartitionIds.bind(client))
//     .then(function (partitionIds) {
//         return partitionIds.map(function (partitionId) {
//             return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
//                 console.log('Created partition receiver: ' + partitionId)
//                 receiver.on('errorReceived', printError);
//                 if(!process.env.disabled) {
//                   receiver.on('message', Data.addDataDirectDB);
//                 }
//             });
//         });
//     })
//     .catch(printError);
