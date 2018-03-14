var AWS = require("aws-sdk");

// Example model
AWS.config.update({
	region: 'us-west-2',
	endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
});
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
	getAllData: function() {
		return new Promise(function(resolve, reject) {
			docClient.scan({
				TableName: process.env.TABLE_NAME
			}, function(err, data) {
				if (err) {
					console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
				} else {
					// print all the movies
					if (data) {
						resolve(data);
					} else {
						reject(err);
					}
				}
			});
		});
	},

	addData: function(req, res) {
		var data = req.body;

		if ((data.hasOwnProperty('temperature') && typeof data['temperature'] === 'string' && data['temperature'].length > 0) &&
			(data.hasOwnProperty('humidity') && typeof data['humidity'] === 'string' && data['humidity'].length > 0) &&
			(data.hasOwnProperty('pi_ID') && typeof data['pi_ID'] === 'string' && data['pi_ID'].length > 0) &&
			(data.hasOwnProperty('pressure') && typeof data['pressure'] === 'string' && data['pressure'].length > 0) &&
			(data.hasOwnProperty('date_time') && typeof data['date_time'] === 'string' && data['date_time'].length > 0)) {
			var params = {
				TableName: process.env.TABLE_NAME,
				Item: {
					temperature: Number(req.body.temperature),
					humidity: Number(req.body.humidity),
					pi_id: req.body.pi_ID,
					pressure: Number(req.body.pressure),
					date_time: Number(req.body.date_time)
				}
			};
			docClient.put(params, function(err, data) {
				if (err) {
					console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					res.send("Item Add Succeeded: " + data);
				}
			});
		} else {
			res.status(400).send("Invalid Post Parameters");
		}
	},

	addDataDirectDB: function(data) {
		console.log(JSON.stringify(data.body));
		var data = data.body;

		if ((data.hasOwnProperty('temperature') && typeof data.temperature === 'number') &&
			(data.hasOwnProperty('humidity') && typeof data.humidity === 'number') &&
			(data.hasOwnProperty('pi_ID') && typeof data.pi_ID === 'string' && data['pi_ID'].length > 0) &&
			(data.hasOwnProperty('pressure') && typeof data.pressure === 'number') &&
			(data.hasOwnProperty('date_time') && typeof data.date_time === 'number')) {

			var params = {
				TableName: process.env.TABLE_NAME,
				Item: {
					temperature: data.temperature,
					humidity: data.humidity,
					pi_id: data.pi_ID,
					pressure: data.pressure,
					date_time: data.date_time
				}
			};

			docClient.put(params, function(err, data) {
				if (err) {
					console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					console.log("Data added");
				}
			});
		}
	}
};
