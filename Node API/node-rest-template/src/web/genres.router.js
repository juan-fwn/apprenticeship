const Router = require('@koa/router');
const genresLib = require('../lib/genres');
const { withResponseMiddleware } = require('../../lib');

const { GenreSerializer } = genresLib;

const router = new Router();

const genresIndexSerializer = new GenreSerializer();

router.get(
  '/',
  withResponseMiddleware(
    genresIndexSerializer,
    (ctx) => genresLib.all({ pageConfig: ctx.state.pageConfig, ids: ctx.query.ids }),
    {
      paged: true,
      defaultPageSize: 20,
    },
  ),
);

const genresShowSerializer = new GenreSerializer();

router.post(
  '/',
  withResponseMiddleware(genresShowSerializer, (ctx) => genresLib.create(ctx.request.body)),
);

module.exports = router;
