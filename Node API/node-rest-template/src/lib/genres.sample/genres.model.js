const { Model } = require('objection');

class Genre extends Model {
  static get tableName() {
    return 'genres';
  }

  static get relationMappings() {
    const { Thing } = require('../things.sample/things.model'); // eslint-disable-line

    return {
      things: {
        relation: Model.ManyToManyRelation,
        modelClass: Thing,
        join: {
          from: 'genres.id',
          through: {
            from: 'things_genres.genre_id',
            to: 'things_genres.thing_id',
          },
          to: 'things.id',
        },
      },
    };
  }
}

module.exports = { Genre };
