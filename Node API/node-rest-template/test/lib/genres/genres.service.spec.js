const genresService = require('../../../src/lib/genres/genres.service');
const { Genre } = require('../../../src/lib/genres/genres.model');
const { genre1, genre2, genre3 } = require('../../fixtures/genres');

const genres = [genre1, genre2, genre3];

describe('genres/service', () => {
  describe('all', () => {
    beforeEach(async () => {
      await Genre.query().del();
      await Genre.query().insert(genres);
    });

    it('returns the list of genres and the total genres count', async () => {
      const response = await genresService.all();
      expect(response).toMatchObject(genres);
    });
  });
});
