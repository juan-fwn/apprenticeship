/* eslint-disable no-console */

const knex = require('knex');
const knexfile = require('../knexfile');
const appConfig = require('../lib/config');
const dropAllViews = require('./dropAllViews');
const createAllViews = require('./createAllViews');

const knexConnection = knex(knexfile[appConfig.NODE_ENV]);

async function runWrappedCommand(command) {
  try {
    await dropAllViews(knexConnection);

    console.log();

    await command(knexConnection);

    console.log();

    await createAllViews(knexConnection);

    process.exit(0);
  } catch (error) {
    console.error('Error running migrations');
    console.error(error);
    process.exit(1);
  }
}

module.exports = runWrappedCommand;
