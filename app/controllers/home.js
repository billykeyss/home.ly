const express = require('express');
const router = express.Router();
const update = express.Router();
const Data = require('../models/data');
const dataUtils = require('../utils/data_utils.js');
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
				chartDataObject[i].labels.push(dataUtils.convertUnixToMomentString(arrayItem.date_time));
				chartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
				chartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
				chartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));

				if ((Date.now() / 1000) < ((arrayItem.date_time + 24 * 60 * 60))) {
					lastDayChartDataObject[i].labels.push(dataUtils.convertUnixToMomentString(arrayItem.date_time));
					lastDayChartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
					lastDayChartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
					lastDayChartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));
				}

				if ((Date.now() / 1000) < (arrayItem.date_time + 7 * 24 * 60 * 60)) {
					lastWeekChartDataObject[i].labels.push(dataUtils.convertUnixToMomentString(arrayItem.date_time));
					lastWeekChartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
					lastWeekChartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
					lastWeekChartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));
				}

				if ((Date.now() / 1000) < (arrayItem.date_time + 30 * 24 * 60 * 60)) {
					lastMonthChartDataObject[i].labels.push(dataUtils.convertUnixToMomentString(arrayItem.date_time));
					lastMonthChartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
					lastMonthChartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
					lastMonthChartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));
				}
			});
		}

		res.render('graph', {
			data: JSON.stringify(chartDataObject),
			lastDayData: JSON.stringify(lastDayChartDataObject),
			lastWeekData: JSON.stringify(lastWeekChartDataObject),
			lastMonthData: JSON.stringify(lastMonthChartDataObject),
			nodeArray: JSON.stringify(Object.keys(chartDataObject))
		});
	});
});

router.get('/live', (req, res, next) => {
	Data.getAllData().then(function(data) {
		var dataArray = data.Items;
		var sortedDataArray = dataUtils.groupBy(dataArray, 'pi_id');

		var lastDataItemArray = {};

		for (var i in sortedDataArray) {
			let item = _.findLast(sortedDataArray[i], function(n) {
				return n;
			});
			lastDataItemArray[i] = {
				pi_id: i,
				temperature: item.temperature.toFixed(2),
				pressure: item.pressure.toFixed(2),
				humidity: item.humidity.toFixed(2)
			}
		};

		_.findLast(sortedDataArray[i], function(n) {
			return n;
		})

		res.render('live', {
			nodeArray: JSON.stringify(Object.keys(sortedDataArray)),
			lastDataItemArray: JSON.stringify(lastDataItemArray)
		});
	});
});


router.get('/snore', (req, res, next) => {
	Data.getSnoreData().then(function(data) {
		var dataArray = data.Items;
		var sortedDataArray = dataUtils.groupBy(dataArray, 'pi_id');
		var tableDataArray = [];
		var countSnoreObject = {}

		var totalSnoreObject = {
			countSnoreLastHour: 0,
			countSnoreLastDay: 0,
			countSnoreLastWeek: 0,
			loudestSnore: 0
		};

		for (var i in sortedDataArray) {
			countSnoreObject[i] = {
				countSnoreLastHour: 0,
				countSnoreLastDay: 0,
				countSnoreLastWeek: 0,
				loudestSnore: 0
			}
			sortedDataArray[i].forEach(function(arrayItem) {
				if(arrayItem.decibels > countSnoreObject[i].loudestSnore) {
					countSnoreObject[i].loudestSnore = arrayItem.decibels.toFixed(2);
				}
				if(arrayItem.decibels > totalSnoreObject.loudestSnore) {
					totalSnoreObject.loudestSnore = arrayItem.decibels.toFixed(2);
				}
				tableDataArray.push([arrayItem.pi_id, dataUtils.convertUnixToMomentStringTable(arrayItem.date_time), arrayItem.decibels.toFixed(2)]);
				if ((Date.now() / 1000) < ((arrayItem.date_time + 24 * 60 * 60))) {
					countSnoreObject[i].countSnoreLastDay++;
					totalSnoreObject.countSnoreLastDay++;
				}
				if ((Date.now() / 1000) < (arrayItem.date_time + 7 * 24 * 60 * 60)) {
					countSnoreObject[i].countSnoreLastWeek++;
					totalSnoreObject.countSnoreLastWeek++;
				}
				if ((Date.now() / 1000) < (arrayItem.date_time + 60 * 60)) {
					countSnoreObject[i].countSnoreLastHour++;
					totalSnoreObject.countSnoreLastHour++;
				}
			});
		}

		countSnoreObject['totalSnoreObject'] = totalSnoreObject;

		res.render('snore', {
			data: JSON.stringify(sortedDataArray),
			nodeArray: JSON.stringify(Object.keys(sortedDataArray)),
			tableData: JSON.stringify(tableDataArray),
			snoreStats: JSON.stringify(countSnoreObject)
		});
	});
});

router.get('/map', (req, res, next) => {
	Data.getAllData().then(function(data) {
		var dataArray = data.Items;
		var sortedDataArray = dataUtils.groupBy(dataArray, 'pi_id');

		var lastDataItemArray = [];

		for (var i in sortedDataArray) {
			let item = _.findLast(sortedDataArray[i], function(n) {
				return n;
			});

			lastDataItemArray.push({
				pi_id: i,
				longitude: item.longitude,
				latitude: item.latitude
			});
		};

		_.findLast(sortedDataArray[i], function(n) {
			return n;
		})

		res.render('map', {
			nodeArray: JSON.stringify(Object.keys(sortedDataArray)),
			lastDataItemArray: JSON.stringify(lastDataItemArray)
		});
	});
});
router.post('/update', (req, res) => Data.addData(req, res));

router.post('/update/snore', (req, res) => Data.addSnoringData(req, res));
