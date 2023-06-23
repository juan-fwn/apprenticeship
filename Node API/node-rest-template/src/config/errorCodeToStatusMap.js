const { BadRequest, ValidationError, CategoryNotFound, Unauthorized } = require('../errors');

const errorCodeToStatusMap = {
  [BadRequest.code]: 400,
  [ValidationError.code]: 400,
  [CategoryNotFound.code]: 404,
  [Unauthorized.code]: 401,
};

module.exports = errorCodeToStatusMap;
