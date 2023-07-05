const Router = require('@koa/router');

const requestLoggerMiddleware = require('../middlewares/requestLoggerMiddleware');
const genresRouter = require('./genres.router');
const moviesRouter = require('./movies.router');

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/healthcheck', (ctx) => {
  ctx.body = { status: 'ok' };
});

apiRouter.use(requestLoggerMiddleware());

apiRouter.use('/genres', genresRouter.routes());
apiRouter.use('/movies', moviesRouter.routes());

module.exports = apiRouter;
