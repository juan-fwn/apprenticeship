exports.seed = async (knex) => {
  await knex('movies').del();
  await knex('movies').insert([
    {
      title: 'Scary Movie',
      tagline: 'Mortalmente divertida.',
      overview:
        'Una parodia de los filmes de asesinatos donde un homicida vengativo acecha a un grupo de adolescentes.',
      release_date: new Date('2000-10-26'),
      poster_url: 'https://www.ecartelera.com/carteles/2500/2597/001_m.jpg',
      backdrop_url: 'https://www.ecartelera.com/carteles/2500/2597/001_m.jpg',
      imdb_id: 'https://www.ecartelera.com/carteles/2500/2597/001_m.jpg',
    },
    {
      title: 'Mortal Kombat',
      tagline: 'Get over here.',
      overview:
        'Cole Young, luchador de MMA, desconoce su ascendencia y tampoco sabe por qué el emperador Shang Tsung ha enviado a su mejor guerrero para atraparlo. Ante esta situación, Cole busca a Sonya Blade siguiendo las indicaciones de Jax.',
      release_date: new Date('2021-04-23'),
      poster_url:
        'https://1.bp.blogspot.com/-zf39QzeDOh0/YKRJl3P5UdI/AAAAAAAAPvE/ZIo1cPLDiH0herGNCsqh1YpHyiFyL482gCLcBGAsYHQ/s1008/MortalKombat.jpg',
      backdrop_url:
        'https://1.bp.blogspot.com/-zf39QzeDOh0/YKRJl3P5UdI/AAAAAAAAPvE/ZIo1cPLDiH0herGNCsqh1YpHyiFyL482gCLcBGAsYHQ/s1008/MortalKombat.jpg',
      imdb_id:
        'https://1.bp.blogspot.com/-zf39QzeDOh0/YKRJl3P5UdI/AAAAAAAAPvE/ZIo1cPLDiH0herGNCsqh1YpHyiFyL482gCLcBGAsYHQ/s1008/MortalKombat.jpg',
    },
    {
      title: 'Los caza novias',
      tagline: 'Lifes a party, crash it.',
      overview:
        'Dos mediadores divorciados pasan un salvaje fin de semana de fiesta con un político y su excéntrica familia.',
      release_date: new Date('2005-07-15'),
      poster_url: 'https://pics.filmaffinity.com/De_boda_en_boda-873850806-large.jpg',
      backdrop_url: 'https://pics.filmaffinity.com/De_boda_en_boda-873850806-large.jpg',
      imdb_id: 'https://pics.filmaffinity.com/De_boda_en_boda-873850806-large.jpg',
    },
  ]);
};
