const Router = require('@koa/router');
const genresLib = require('../lib/genres');
const { withResponseMiddleware } = require('../../lib');

const { GenreSerializer } = genresLib;

const router = new Router();

const genresIndexSerializer = new GenreSerializer();

router.get(
  '/',
  withResponseMiddleware(genresIndexSerializer, () => genresLib.all()),
);

module.exports = router;
