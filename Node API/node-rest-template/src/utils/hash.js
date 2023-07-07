const bcryptjs = require('bcryptjs');

function hash(string) {
  const passwordSalt = bcryptjs.genSaltSync(10);
  const passwordHash = bcryptjs.hashSync(string, passwordSalt);
  const result = { passwordHash, passwordSalt };

  return result;
}

function compareHash(string, hashedString) {
  const result = bcryptjs.compareSync(string, hashedString);

  return result;
}

module.exports = { hash, compareHash };
