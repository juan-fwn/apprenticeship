exports.seed = async (knex) => {
  await knex('categories').del();
  await knex('categories').insert([{ name: 'category1' }, { name: 'category2' }]);
};
