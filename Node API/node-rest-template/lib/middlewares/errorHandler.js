const { logger } = require('../../src/utils/logger');

module.exports = function errorHandlerMiddleware(errorCodeToStatusMap) {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      logger.error({ reqId: ctx.req.id, err: error, method: ctx.method, url: ctx.url });
      if (error.loggerOnly) {
        delete error.loggerOnly;
      }
      const status = error.isJoi ? 400 : errorCodeToStatusMap[error.code];
      const isExpected = status !== undefined;

      let errorToSend = isExpected ? error : 'Internal Server Error';
      if (error.isJoi) {
        errorToSend = { details: error.details.map((e) => e.message).join(', ') };
      }
      ctx.body = { error: errorToSend };
      ctx.status = isExpected ? status : 500;
    }
  };
};
