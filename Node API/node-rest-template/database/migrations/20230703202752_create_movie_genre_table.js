exports.up = (knex) =>
  knex.schema.createTable('movies_genres', (table) => {
    table.integer('movie_id').references('movies.id');
    table.integer('genre_id').references('genres.id');
  });

exports.down = (knex) => knex.schema.dropTable('movies_genres');
