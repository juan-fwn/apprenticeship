const { MovieSerializer } = require('../../../src/lib/movies');

describe('movies/serializer', () => {
  const serviceOutput = {
    title: 'm_1',
    tagline: 'm_1',
    overview: 'm_1',
    release_date: 'ISOSTRING1',
    poster_url: 'm_1',
    backdrop_url: 'm_1',
    imdb_id: 'm_1',
  };

  describe('by default', () => {
    const serializer = new MovieSerializer();

    it('serializes properly', () => {
      const serializerOutput = {
        title: 'm_1',
        tagline: 'm_1',
        overview: 'm_1',
        release_date: 'ISOSTRING1',
        poster_url: 'm_1',
        backdrop_url: 'm_1',
        imdb_id: 'm_1',
      };

      expect(serializer.serialize(serviceOutput)).toEqual(serializerOutput);
    });
  });
});
