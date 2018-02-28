const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config');
const db = {};

const mysql = require('mysql2');

const conn = new mysql.createConnection(config.connConfig);

conn.connect(
  function(err) {
    if (err) {
      console.log("!!! Cannot connect !!! Error:");
      throw err;
    } else {
      console.log("Connection established.");
    }
  });

console.log('test');
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    console.log(file);
    // const model = sequelize['import'](path.join(__dirname, file));
    // db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;
