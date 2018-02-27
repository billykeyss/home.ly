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
    db: 'mysql://localhost/homely-web-development'
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
