const { Model } = require('objection');

class Genre extends Model {
  static get tableName() {
    return 'genres';
  }

  // static get relationMappings() {
  //   const { Movie } = require('../movies/movies.model'); // eslint-disable-line

  //   return {
  //     movies: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Movie,
  //       join: {
  //         from: 'genres.id',
  //         through: {
  //           from: 'movies_genres.movieId',
  //           to: 'movies_genres.genreId',
  //         },
  //         to: 'movie.genreId',
  //       },
  //     },
  //   };
  // }
}

module.exports = { Genre };
