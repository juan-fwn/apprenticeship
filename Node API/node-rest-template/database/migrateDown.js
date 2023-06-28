/* eslint-disable no-console */

const runWrappedCommand = require('./runWrappedCommand');

const [name] = process.argv.slice(2);

runWrappedCommand(async (knexConnection) => {
  console.log(name ? `Undoing migration: ${name}` : 'Undoing latest migration...');
  const [batchNo, log] = await knexConnection.migrate.down({ name });
  if (log.length === 0) {
    console.log('Already at the base migration');
  } else {
    console.log(`Batch ${batchNo} rolled back the following migrations:\n${log.join('\n')}`);
  }
});
