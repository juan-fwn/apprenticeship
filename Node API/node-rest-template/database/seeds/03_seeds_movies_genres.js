exports.seed = async (knex) => {
  await knex('movies_genres').del();
  await knex('movies_genres').insert([
    {
      movie_id: 1,
      genre_id: 1,
    },
    {
      movie_id: 1,
      genre_id: 2,
    },
    {
      movie_id: 1,
      genre_id: 3,
    },
    {
      movie_id: 2,
      genre_id: 1,
    },
    {
      movie_id: 2,
      genre_id: 2,
    },
    {
      movie_id: 3,
      genre_id: 1,
    },
  ]);
};
