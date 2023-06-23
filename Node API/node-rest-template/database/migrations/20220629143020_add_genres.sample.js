exports.up = (knex) =>
  knex.schema.createTable('genres', (table) => {
    table.increments();
    table.string('name');
  });

exports.down = (knex) => knex.schema.dropTable('genres');
