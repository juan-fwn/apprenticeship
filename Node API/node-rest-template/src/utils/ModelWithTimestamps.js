const { Model } = require('objection');

class ModelWithTimestamps extends Model {
  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

module.exports = {
  ModelWithTimestamps,
};
