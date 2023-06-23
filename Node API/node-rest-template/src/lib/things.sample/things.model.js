const { Model } = require('objection');
const { ModelWithTimestamps } = require('../../utils/ModelWithTimestamps');

// Since this model has timestamps declared in its migration table, it's better to use the ModelWithTimestamps helper instead of the Objection base Model
class Thing extends ModelWithTimestamps {
  static get tableName() {
    return 'things';
  }

  static get modifiers() {
    return {
      active(builder) {
        builder.where({ active: true });
      },
      inactive(builder) {
        builder.where({ active: false });
      },
    };
  }

  static get relationMappings() {
    const { Category } = require('../categories.sample/categories.model'); //eslint-disable-line
    const { Genre } = require('../genres.sample/genres.model'); // eslint-disable-line

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'things.category_id',
          to: 'categories.id',
        },
      },
      genres: {
        relation: Model.ManyToManyRelation,
        modelClass: Genre,
        join: {
          from: 'things.id',
          through: {
            from: 'things_genres.thing_id',
            to: 'things_genres.genre_id',
          },
          to: 'genres.id',
        },
      },
    };
  }
}

module.exports = { Thing };
