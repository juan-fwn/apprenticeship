const request = require('supertest');
const { initializeApp } = require('../../lib');

const errorCodeToStatusMap = require('../../src/config/errorCodeToStatusMap');
const { Genre } = require('../../src/lib/genres/genres.model');
const genresRouter = require('../../src/web/genres.router');
const { genre1, genre2, genre3 } = require('../fixtures/genres');

const genres = [genre1, genre2, genre3];

describe('genres/router', () => {
  const app = initializeApp({ router: genresRouter, errorCodeToStatusMap });
  const server = app.listen();

  const serviceResponse = {
    genres,
  };

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    beforeEach(async () => {
      await Genre.query().del();
      await Genre.query().insert(genres);
    });

    it('should return list of genres', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(serviceResponse);
    });
  });
});
