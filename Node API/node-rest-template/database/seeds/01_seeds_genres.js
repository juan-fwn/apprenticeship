exports.seed = async (knex) => {
  await knex('genres').del();
  await knex('genres').insert([{ name: 'action' }, { name: 'drama' }, { name: 'terror' }]);
};
