const PinoLogger = require('pino');
const config = require('../config');

const sensitiveFieldsDefault = [
  /password/i,
  /secret/i,
  /token/i,
  /otp/i,
  /ssn/i,
  /crypt/i,
  /salt/i,
  /certificate/i,
];
const redactedKeysDefault = ['req.headers.authorization', 'req.headers.cookie'];

function initializeLogger({
  sensitiveFields = sensitiveFieldsDefault,
  redactedKeys = redactedKeysDefault,
} = {}) {
  const isPlainObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

  let hideSensitiveInfo = null;
  if (sensitiveFields.length > 0) {
    hideSensitiveInfo = (obj, depth = 0) => {
      if (!isPlainObject(obj) || depth > 10) return obj;
      const result = {};
      Object.keys(obj).forEach((key) => {
        if (sensitiveFields.some((sensitiveFieldRegex) => sensitiveFieldRegex.test(key))) {
          result[key] = '[Redacted]';
        } else {
          result[key] = hideSensitiveInfo(obj[key], depth + 1);
        }
      });
      return result;
    };
  }

  const logger = new PinoLogger({
    level: config.LOGGER_LEVEL,
    formatters: {
      log: (obj) => {
        try {
          if (obj && obj.skipFormatting) return obj;
          return hideSensitiveInfo ? hideSensitiveInfo(obj) : obj;
        } catch (err) {
          logger.fatal({ err, obj, skipFormatting: true }, 'Error formatting object for log');
          return obj;
        }
      },
    },
    serializers: {
      err: PinoLogger.stdSerializers.err,
      req: PinoLogger.stdSerializers.wrapRequestSerializer((serializedReq) => ({
        ...serializedReq,
        body: serializedReq.raw.body,
      })),
    },
    redact: redactedKeys,
  });

  return logger;
}

module.exports = {
  initializeLogger,
};
