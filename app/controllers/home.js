const express = require('express');
const router = express.Router();
const update = express.Router();
const Data = require('../models/data');
const dataUtils = require('../utils/data_utils.js');
const moment = require('moment');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Data.getAllData().then(function(data) {
    var dataArray = data.Items;
    var sortedDataArray = dataUtils.groupBy(dataArray,'pi_id');
    let chartDataObject = {};
    let nodeArray = [];
    var lastItem;

    for (var i in sortedDataArray) {
      chartDataObject[i] = {};
      chartDataObject[i].labels = [];
      chartDataObject[i].humidity = [];
      chartDataObject[i].temperature = [];
      chartDataObject[i].pressure = [];

      sortedDataArray[i].forEach( function (arrayItem) {
          chartDataObject[i].labels.push(moment(arrayItem.date_time * 1000).format("dddd, MMMM Do YYYY, H:mm:ss"));
          chartDataObject[i].humidity.push(arrayItem.humidity.toFixed(2));
          chartDataObject[i].temperature.push(arrayItem.temperature.toFixed(2));
          chartDataObject[i].pressure.push(arrayItem.pressure.toFixed(2));
          lastItem = arrayItem;
      });
    }

    // for (const [key, value] of Object.entries(chartDataObject)) {
    //   nodeArray.push(key);
    // }

    res.render('layout', {
      data: JSON.stringify(chartDataObject),
      nodeArray: JSON.stringify(nodeArray),
      lastTemperatureReading: JSON.stringify(lastItem.temperature.toFixed(2).toString()),
      lastPressureReading: JSON.stringify(lastItem.pressure.toFixed(2).toString()),
      lastHumidityReading: JSON.stringify(lastItem.humidity.toFixed(2).toString())
    });
  });
});

router.post('/update', (req, res) => Data.addData(req, res));

router.post('/update/snore', (req,res) => Data.addSnoringData(req,res));
