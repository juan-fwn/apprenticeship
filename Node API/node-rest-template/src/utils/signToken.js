const jwt = require('jsonwebtoken');

const constants = require('../constants');

const signToken = (user) => {
  const { email, isAdmin } = user;
  const token = jwt.sign({ email, isAdmin }, constants.JWT_SECRET);

  return token;
};

module.exports = signToken;
