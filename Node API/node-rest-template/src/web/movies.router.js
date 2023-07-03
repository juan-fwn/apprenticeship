const Router = require('@koa/router');
const moviesLib = require('../lib/movies');
const { withResponseMiddleware } = require('../../lib');

const { MovieSerializer } = moviesLib;

const router = new Router();

const moviesIndexSerializer = new MovieSerializer();

router.get(
  '/',
  withResponseMiddleware(
    moviesIndexSerializer,
    (ctx) =>
      moviesLib.all({
        pageConfig: ctx.state.pageConfig,
        ids: ctx.query.ids,
        sortField: ctx.query.sortField,
        sortDirection: ctx.query.sortDirection,
        filter: ctx.query.filter,
      }),
    {
      paged: true,
      defaultPageSize: 20,
    },
  ),
);

module.exports = router;
