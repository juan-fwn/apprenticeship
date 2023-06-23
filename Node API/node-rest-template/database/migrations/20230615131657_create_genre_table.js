exports.up = function (knex) {
  return knex.schema.createTable('genres', function (table) {
    table.increments('id').primary();
    table.string('name');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('genres');
};
