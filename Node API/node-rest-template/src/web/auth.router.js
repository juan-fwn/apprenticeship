const Router = require('@koa/router');

const { passport } = require('../../lib');
const { Unauthorized } = require('../errors');
const signToken = require('../utils/signToken');

const router = new Router();

function localAuthenticator(ctx) {
  return passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      throw new Unauthorized({ details: 'Invalid credentials' });
    }

    const token = signToken(user);

    ctx.body = { token };
  })(ctx);
}

router.post('/login', localAuthenticator);

module.exports = router;
