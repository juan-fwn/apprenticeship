/* eslint-disable no-console */

const runWrappedCommand = require('./runWrappedCommand');

const [name] = process.argv.slice(2);

runWrappedCommand(async (knexConnection) => {
  console.log(name ? `Running migration: ${name}` : 'Running next pending migration...');
  const [batchNo, log] = await knexConnection.migrate.up({ name });
  if (log.length === 0) {
    console.log('Already up to date');
  } else {
    console.log(`Batch ${batchNo} ran the following migrations:\n${log.join('\n')}`);
  }
});
