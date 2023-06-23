const { Model } = require('objection');
const { ModelWithTimestamps } = require('../../utils/ModelWithTimestamps');

// Since this model has timestamps declared in its migration table, it's better to use the ModelWithTimestamps helper instead of the Objection base Model
class Category extends ModelWithTimestamps {
  static get tableName() {
    return 'categories';
  }

  static get relationMappings() {
    const { Thing } = require('../things.sample/things.model'); //eslint-disable-line

    return {
      things: {
        relation: Model.HasManyRelation,
        modelClass: Thing,
        join: {
          from: 'categories.id',
          to: 'things.category_id',
        },
      },
    };
  }
}

module.exports = { Category };
