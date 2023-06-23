exports.seed = async (knex) => {
  await knex('things_genres').del();
  await knex('things_genres').insert([
    {
      thing_id: 1,
      genre_id: 1,
    },
    {
      thing_id: 2,
      genre_id: 1,
    },
    {
      thing_id: 2,
      genre_id: 2,
    },
    {
      thing_id: 3,
      genre_id: 1,
    },
    {
      thing_id: 3,
      genre_id: 2,
    },
    {
      thing_id: 3,
      genre_id: 3,
    },
  ]);
};
