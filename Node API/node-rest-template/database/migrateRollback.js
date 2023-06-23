/* eslint-disable no-console */

const runWrappedCommand = require('./runWrappedCommand');

runWrappedCommand(async (knexConnection) => {
  console.log('Rolling back latest migration group...');
  const [batchNo, log] = await knexConnection.migrate.rollback();
  if (log.length === 0) {
    console.log('Already at the base migration');
  } else {
    console.log(`Batch ${batchNo} rolled back: ${log.length} migrations`);
  }
});
