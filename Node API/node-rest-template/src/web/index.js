const Router = require('@koa/router');

const jwtAuthenticator = require('../middlewares/jwtAuthenticator');

const requestLoggerMiddleware = require('../middlewares/requestLoggerMiddleware');
const genresRouter = require('./genres.router');
const moviesRouter = require('./movies.router');
const authRouter = require('./auth.router');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/healthcheck', (ctx) => {
  ctx.body = { status: 'ok' };
});

apiRouter.use(requestLoggerMiddleware());

apiRouter.use('/auth', authRouter.routes());
apiRouter.use('/genres', genresRouter.routes());
apiRouter.use('/movies', moviesRouter.routes());

module.exports = apiRouter;
