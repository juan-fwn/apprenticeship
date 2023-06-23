const passport = require('koa-passport');

function createJwtAuthenticator({ ErrorClass, stateKey = 'user' }) {
  return (ctx, next) =>
    passport.authenticate('jwt', { session: false }, (_, jwtPayload, error) => {
      if (!jwtPayload || error) {
        throw new ErrorClass({ details: 'Invalid token', loggerOnly: { originalError: error } });
      }
      ctx.state[stateKey] = jwtPayload;
      return next();
    })(ctx, next);
}

module.exports = { createJwtAuthenticator };
