require('dotenv').config();
const path = require('path');

const BASE_PATH = path.join(__dirname, 'database');

const makeConfig = (environment) => {
  const databaseName = environment === 'test' ? null : process.env.DATABASE_NAME;
  return {
    client: 'postgresql',
    connection: {
      database: databaseName || `${process.env.DATABASE}_${environment}`,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  };
};

module.exports = {
  development: makeConfig('development'),
  test: makeConfig('test'),
  production: makeConfig('production'),
};
