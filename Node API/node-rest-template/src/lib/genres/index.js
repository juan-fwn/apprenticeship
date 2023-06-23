const { Genre } = require('./genres.model');
const GenreSerializer = require('./genres.serializer');
const genresService = require('./genres.service');

module.exports = {
  Genre,
  GenreSerializer,
  ...genresService,
};
