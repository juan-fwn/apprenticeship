/* eslint-disable no-console */

const runWrappedCommand = require('./runWrappedCommand');

runWrappedCommand(async (knexConnection) => {
  console.log('Migrating to latest...');
  const [batchNo, log] = await knexConnection.migrate.latest();
  if (log.length === 0) {
    console.log('Already up to date');
  } else {
    console.log(`Batch ${batchNo} run: ${log.length} migrations`);
  }
});
