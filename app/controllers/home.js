const express = require('express');
const router = express.Router();
const update = express.Router();
const Data = require('../models/data');
const dataUtils = require('../utils/data_utils.js');
const moment = require('moment');
const _ = require('lodash');

module.exports = (app) => {
	app.use('/', router);
};

router.get('/', (req, res, next) => {
	Data.getAllData().then(function(data) {
		var dataArray = data.Items;
		var sortedDataArray = dataUtils.groupBy(dataArray, 'pi_id');
		var chartDataObject = {};
    var lastDayChartDataObject = {};
    var lastWeekChartDataObject = {};
    var lastMonthChartDataObject = {};
		let nodeArray = [];
		var lastItem;
    var emptyDataObject = {
      labels: [],
      humidity: [],
      temperature: [],
      pressure: []
    };

		for (var i in sortedDataArray) {
			chartDataObject[i] = _.cloneDeep(emptyDataObject);
      lastDayChartDataObject[i] = _.cloneDeep(chartDataObject[i]);
      lastWeekChartDataObject[i] = _.cloneDeep(lastDayChartDataObject[i]);
      lastMonthChartDataObject[i] = _.cloneDeep(lastWeekChartDataObject[i]);

			sortedDataArray[i].forEach(function(arrayItem) {
				chartDataObject[i].labels.push(moment(arrayItem.date_time * 1000).format("dddd, MMMM Do YYYY, H:mm:ss"));
				chartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
				chartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
				chartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));

				if ((Date.now() / 1000) < ((arrayItem.date_time + 24 * 60 * 60))) {
					lastDayChartDataObject[i].labels.push(moment(arrayItem.date_time * 1000).format("dddd, MMMM Do YYYY, H:mm:ss"));
					lastDayChartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
					lastDayChartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
					lastDayChartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));
				}

				if ((Date.now() / 1000) < (arrayItem.date_time + 7 * 24 * 60 * 60)) {
					lastWeekChartDataObject[i].labels.push(moment(arrayItem.date_time * 1000).format("dddd, MMMM Do YYYY, H:mm:ss"));
					lastWeekChartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
					lastWeekChartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
					lastWeekChartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));
				}

        if ((Date.now() / 1000) < (arrayItem.date_time + 30 * 24 * 60 * 60)) {
          lastMonthChartDataObject[i].labels.push(moment(arrayItem.date_time * 1000).format("dddd, MMMM Do YYYY, H:mm:ss"));
          lastMonthChartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
          lastMonthChartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
          lastMonthChartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));
        }
				lastItem = arrayItem;
			});
		}

		// for (const [key, value] of Object.entries(chartDataObject)) {
		//   nodeArray.push(key);
		// }

		res.render('layout', {
			data: JSON.stringify(chartDataObject),
			lastDayData: JSON.stringify(lastDayChartDataObject),
			lastWeekData: JSON.stringify(lastWeekChartDataObject),
			lastMonthData: JSON.stringify(lastMonthChartDataObject),
			nodeArray: JSON.stringify(Object.keys(chartDataObject)),
			lastTemperatureReading: JSON.stringify(lastItem.temperature.toFixed(2).toString()),
			lastPressureReading: JSON.stringify(lastItem.pressure.toFixed(2).toString()),
			lastHumidityReading: JSON.stringify(lastItem.humidity.toFixed(2).toString())
		});
	});
});

router.post('/update', (req, res) => Data.addData(req, res));

router.post('/update/snore', (req, res) => Data.addSnoringData(req, res));
