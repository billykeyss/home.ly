const express = require('express');
const router = express.Router();
const update = express.Router();
const Data = require('../models/data');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Data.getAllData().then(function(data) {
    res.render('layout', {
      data: JSON.stringify(data.Items)
    });
  });
});

router.post('/update', (req, res) => Data.addData(req, res));
