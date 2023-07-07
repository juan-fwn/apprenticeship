exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').unique().notNullable();
    table.string('full_name');
    table.string('photo_path');
    table.string('password_salt').notNullable();
    table.string('password_hash').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
