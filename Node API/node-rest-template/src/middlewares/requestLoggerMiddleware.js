const uuid = require('uuid');
const { logger } = require('../utils/logger');

module.exports = function requestLoggerMiddleware() {
  return (ctx, next) => {
    ctx.req.id = uuid.v4();
    const logResponse = () => {
      try {
        ctx.res.removeListener('finish', logResponse);
        ctx.res.removeListener('close', logResponse);
        logger.info(
          {
            req: { ...ctx.req, body: ctx.request.body },
            res: { status: ctx.response.status },
          },
          'Request completed',
        );
      } catch (err) {
        // catch the error to avoid the app crashing
        logger.error({ err }, 'Error while logging');
      }
    };
    ctx.res.on('finish', logResponse);
    ctx.res.on('close', logResponse);

    return next();
  };
};
