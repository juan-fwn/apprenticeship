/* eslint-disable no-console */

async function dropAllViews(knexConnection) {
  console.log('Fetching views to drop...');
  const { rows: dbViewsToDrop } = await knexConnection.raw(
    'Select * from INFORMATION_SCHEMA.views WHERE table_schema = ANY (current_schemas(false))',
  );
  const viewNamesToDrop = dbViewsToDrop.map((viewData) => viewData.table_name);

  console.log('Dropping the following views:', viewNamesToDrop);
  await Promise.all(
    viewNamesToDrop.map((viewName) => knexConnection.raw(`DROP VIEW IF EXISTS ${viewName}`)),
  );

  console.log('Views dropped!');
}

module.exports = dropAllViews;
