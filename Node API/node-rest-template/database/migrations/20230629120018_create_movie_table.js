/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('movies', (table) => {
    table.increments();
    table.string('title');
    table.string('tagline');
    table.string('overview');
    table.date('release_date');
    table.string('poster_url');
    table.string('backdrop_url');
    table.string('imdb_id');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('movies');
