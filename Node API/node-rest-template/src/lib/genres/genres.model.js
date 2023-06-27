const { Model } = require('objection');

class Genre extends Model {
  static get tableName() {
    return 'genres';
  }
}

module.exports = { Genre };
