const Joi = require('joi');
const { logger } = require('../../src/utils/logger');

const pagedValidation = Joi.object()
  .keys({
    page: Joi.number().min(0).optional(),
    pageSize: Joi.number().min(1).optional(),
  })
  .unknown();

module.exports = function withResponseMiddleware(
  serializer,
  flow,
  { paged = false, defaultPageSize = 10 } = {},
) {
  return async (ctx, next) => {
    if (paged) {
      const validationResult = Joi.attempt(ctx.query, pagedValidation);

      ctx.state.pageConfig = {
        page: validationResult.page || 0,
        pageSize: validationResult.pageSize || defaultPageSize,
      };
    }

    const flowResult = await flow(ctx);
    const resource = paged ? flowResult.results : flowResult;
    const serializedResults = serializer.serialize(resource);
    logger.debug(serializedResults, ctx.method, ctx.url);

    if (paged) {
      serializedResults.pageData = {
        total: flowResult.total,
        ...ctx.state.pageConfig,
      };
    }

    ctx.body = serializedResults;

    if (next) {
      await next();
    }
  };
};
