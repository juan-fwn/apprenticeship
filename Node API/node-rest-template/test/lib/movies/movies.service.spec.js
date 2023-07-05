const { knexConnection } = require('../../knexTestHelper');

const moviesService = require('../../../src/lib/movies/movies.service');
const { Movie } = require('../../../src/lib/movies/movies.model');
const { movie1, movie2, movie3 } = require('../../fixtures/movies');
const { genre1, genre2, genre3 } = require('../../fixtures/genres');

const movies = [movie1, movie2, movie3];
const genres = [genre1, genre2, genre3];

describe('movies/service', () => {
  describe('all', () => {
    let moviesResults;

    beforeEach(async () => {
      await Movie.query().del();

      const moviesIds = await knexConnection('movies').insert(movies).returning('id');
      const genresInserted = await knexConnection('genres').insert(genres).returning('*');
      const moviesGenresToInsert = [
        { movie_id: moviesIds[0].id, genre_id: genresInserted[0].id },
        { movie_id: moviesIds[0].id, genre_id: genresInserted[1].id },
        { movie_id: moviesIds[0].id, genre_id: genresInserted[2].id },
        { movie_id: moviesIds[1].id, genre_id: genresInserted[0].id },
        { movie_id: moviesIds[1].id, genre_id: genresInserted[1].id },
        { movie_id: moviesIds[2].id, genre_id: genresInserted[0].id },
      ];

      await knexConnection('movies_genres').insert(moviesGenresToInsert);

      moviesResults = [
        {
          ...movie1,
          genres: [genresInserted[0], genresInserted[1], genresInserted[2]],
        },
        {
          ...movie2,
          genres: [genresInserted[0], genresInserted[1]],
        },
        {
          ...movie3,
          genres: [genresInserted[0]],
        },
      ];
    });

    describe('when not passed a page config', () => {
      const pageConfig = undefined;

      it('throws TypeError', () => {
        expect(() => moviesService.all({ pageConfig })).toThrow(
          "Cannot read properties of undefined (reading 'page')",
        );
      });
    });

    describe('when passed a page config', () => {
      describe('when getting all the movies', () => {
        const pageConfig = { page: 0, pageSize: 10 };

        it('returns the list of movies and the total movies count', async () => {
          const response = await moviesService.all({ pageConfig });
          expect(response).toMatchObject({
            results: moviesResults,
            total: 3,
          });
        });
      });

      describe('when getting the first page (size 2)', () => {
        const pageConfig = { page: 0, pageSize: 2 };

        it('returns the list of movies and the total movies count', async () => {
          const response = await moviesService.all({ pageConfig });
          expect(response).toMatchObject({
            results: [moviesResults[0], moviesResults[1]],
            total: 3,
          });
        });
      });

      describe('when passed an array of 2 ids', () => {
        const pageConfig = { page: 0, pageSize: 2 };
        const moviesIds = [1, 2];

        it('returns those movies', async () => {
          const response = await moviesService.all({ pageConfig, ids: moviesIds });
          expect(response).toMatchObject({
            results: [moviesResults[0], moviesResults[1]],
            total: 2,
          });
        });
      });

      describe('when sorting', () => {
        const pageConfig = { page: 0, pageSize: 10 };
        const sortField = 'title';

        it('returns movies sorted by title asc', async () => {
          const sortDirection = 'asc';

          const response = await moviesService.all({ pageConfig, sortField, sortDirection });

          expect(response).toMatchObject({
            results: [moviesResults[2], moviesResults[1], moviesResults[0]],
            total: 3,
          });
        });

        it('returns movies sorted by title desc', async () => {
          const sortDirection = 'desc';

          const response = await moviesService.all({ pageConfig, sortField, sortDirection });

          expect(response).toMatchObject({
            results: [moviesResults[0], moviesResults[1], moviesResults[2]],
            total: 3,
          });
        });
      });

      describe('when filtering', () => {
        const pageConfig = { page: 0, pageSize: 10 };

        it('filter by title', async () => {
          const filter = 'title:Mort';

          const response = await moviesService.all({ pageConfig, filter });

          expect(response).toMatchObject({
            results: [moviesResults[1]],
            total: 1,
          });
        });
      });
    });
  });
});
