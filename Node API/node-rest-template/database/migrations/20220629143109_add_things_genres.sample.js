exports.up = (knex) =>
  knex.schema.createTable('things_genres', (table) => {
    table.integer('thing_id').references('things.id');
    table.integer('genre_id').references('genres.id');
  });

exports.down = (knex) => knex.schema.dropTable('things_genres');
