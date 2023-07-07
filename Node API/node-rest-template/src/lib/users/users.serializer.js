const { Serializer } = require('../../../lib');

class UserSerializer extends Serializer {
  constructor() {
    super({ collectionName: 'users' });

    this.baseFields = ['email', 'full_name', 'photo_path', 'password_salt', 'password_hash'];

    this.meta = {};
  }
}

module.exports = UserSerializer;
