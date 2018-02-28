const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'homely-web'
    },
    port: process.env.PORT || 3000, 
    connConfig: {
      host: 'homely-server-dev.mysql.database.azure.com',
      user: 'myadmin@homely-server-dev',
      password: 'password123!',
      database: 'homely_db_dev',
      port: 3306,
      ssl: true
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'homely-web'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/homely-web-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'homely-web'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/homely-web-production'
  }
};

module.exports = config[env];
