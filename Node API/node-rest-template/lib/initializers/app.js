const Koa = require('koa');
const addExtendedQsParser = require('koa-qs');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const swaggerParser = require('@apidevtools/swagger-parser');
const { koaSwagger } = require('koa2-swagger-ui');
const errorHandlerMiddleware = require('../middlewares/errorHandler');
const { initializeOrm } = require('./orm');
const pkg = require('../../package.json');

async function addSwagger(app, swaggerRoute) {
  // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema
  const spec = await swaggerParser.dereference({
    openapi: '3.0.3',
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
    },
    paths: { $ref: './src/web/docs.sample/index.yaml' },
    components: {
      schemas: { $ref: './src/web/docs.sample/components/schemas/_index.yaml' },
      responses: { $ref: './src/web/docs.sample/components/responses/_index.yaml' },
    },
  });

  app.use(koaSwagger({ routePrefix: swaggerRoute, swaggerOptions: { spec } }));
}

function initializeApp({
  router,
  errorCodeToStatusMap,
  knexfile,
  passportStrategies = [],
  swaggerRoute,
} = {}) {
  if (knexfile) initializeOrm({ knexfile });

  const app = new Koa();

  addExtendedQsParser(app);

  app.use(bodyParser());

  if (swaggerRoute) addSwagger(app, swaggerRoute);

  if (errorCodeToStatusMap) {
    app.use(errorHandlerMiddleware(errorCodeToStatusMap));
  }

  if (router) {
    app.use(router.routes());
  }

  passportStrategies.forEach((strategy) => passport.use(strategy.alias, strategy.concreteStrategy));

  return app;
}

module.exports = {
  initializeApp,
};
