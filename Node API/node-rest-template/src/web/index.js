const Router = require('@koa/router');

const requestLoggerMiddleware = require('../middlewares/requestLoggerMiddleware');
const genresRouter = require('./genres.router'); // bin/cleanup mark

const apiRouter = new Router({ prefix: '/api' });

apiRouter.get('/healthcheck', (ctx) => {
  ctx.body = { status: 'ok' };
});

apiRouter.use(requestLoggerMiddleware());

apiRouter.use('/genres', genresRouter.routes());

module.exports = apiRouter;
