exports.seed = async (knex) => {
  await knex('genres').del();
  await knex('genres').insert([{ name: 'genre1' }, { name: 'genre2' }, { name: 'genre3' }]);
};
