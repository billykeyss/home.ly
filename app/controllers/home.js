const express = require('express');
const router = express.Router();
const db = require('../models');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Generator-Express MVC'
    // articles: articles
  });
  // db.Data.findAll().then((datapoints) => {
  // });
});

router.post('/update', (req, res, next) => {
  res.send('test');
})
