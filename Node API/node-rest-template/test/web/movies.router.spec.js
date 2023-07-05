const request = require('supertest');
const { initializeApp } = require('../../lib');

const errorCodeToStatusMap = require('../../src/config/errorCodeToStatusMap');
const { Movie } = require('../../src/lib/movies/movies.model');
const moviesRouter = require('../../src/web/movies.router');
const { movie1, movie2, movie3 } = require('../fixtures/movies');

const movies = [movie1, movie2, movie3];

describe('movies/router', () => {
  const app = initializeApp({ router: moviesRouter, errorCodeToStatusMap });
  const server = app.listen();

  const serviceResponse = {
    movies: movies.map((movie) => {
      return { ...movie, release_date: movie.release_date.toISOString() };
    }),
  };

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    beforeEach(async () => {
      await Movie.query().del();
      await Movie.query().insert(movies);
    });

    it('should return list of movies', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(serviceResponse);
    });

    it('should return the correct movie', async () => {
      const response = await request(server).get('?ids=[1]');

      const formatedMovie = [
        {
          ...movie1,
          release_date: movie1.release_date.toISOString(),
        },
      ];

      expect(response.status).toBe(200);
      expect(response.body.movies).toMatchObject(formatedMovie);
    });

    it('should return the movie filtered by tagline', async () => {
      const response = await request(server).get('?filter=tagline:Get over here.');

      expect(response.status).toBe(200);
      expect(response.body.movies).toMatchObject(
        serviceResponse.movies.filter((movie) => movie.tagline === 'Get over here.'),
      );
    });

    it('should return a list of movies sorted by direction and field', async () => {
      const response = await request(server).get('?sortField=tagline&sortDirection=desc');

      expect(response.status).toBe(200);
      expect(response.body.movies).toMatchObject(
        serviceResponse.movies.sort((a, b) => b.tagline.localeCompare(a.tagline)),
      );
    });
  });
});
