const { createJwtAuthenticator } = require('../../lib/middlewares/authMiddlewares');

const { Unauthorized } = require('../errors');

const jwtAuthenticator = createJwtAuthenticator({ ErrorClass: Unauthorized });

module.exports = jwtAuthenticator;
