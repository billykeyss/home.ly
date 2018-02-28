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

db.conn = conn;

module.exports = db;












const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config');
const db = {};

// const sequelize = new Sequelize(config.config);
// const sequelize = new Sequelize(config.config.database, config.db.username, config.db.password, {
//   host: config.db.host,
//   dialect: config.db.dialect,
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
//   dialectOptions: {
//     charset: 'utf8'
//   }
// });

var sequelize = new Sequelize(
  config.database,
  config.user,
  config.password, {
    port: config.port,
    host: config.server,
    logging: console.log,
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      charset: 'utf8'
    }
  }
);

console.log('test');
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
