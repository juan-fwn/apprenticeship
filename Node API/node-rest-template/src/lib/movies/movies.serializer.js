const { Serializer } = require('../../../lib');

class MovieSerializer extends Serializer {
  constructor({ genreSerializer = null } = {}) {
    super({ collectionName: 'movies' });

    this.baseFields = [
      'title',
      'tagline',
      'overview',
      'release_date',
      'poster_url',
      'backdrop_url',
      'imdb_id',
    ];

    this.meta = {};

    if (genreSerializer) {
      this.meta.genres = Serializer.nested('genres', genreSerializer);
    }
  }
}

module.exports = MovieSerializer;
