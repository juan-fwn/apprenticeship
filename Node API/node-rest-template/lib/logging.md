# Logging

The logging library used is pino https://github.com/pinojs/pino

## `requestLoggerMiddleware`

By default, every request is logged using `requestLoggerMiddleware`.

This middleware logs:
- The request, including url, method, headers and body.
- The response status code.

Modify it to suit your needs.

Example of a request to the api logged by `requestLoggerMiddleware`:

```
api_1  | [1648228365319] INFO  (111 on da0085b7fd38): Request completed
api_1  |     req: {
api_1  |       "id": "c05ee9d1-b5a2-4e8e-80fe-adf68304a64d",
api_1  |       "method": "POST",
api_1  |       "url": "/api/members/login",
api_1  |       "headers": {
api_1  |         "host": "localhost:3001",
api_1  |         "connection": "keep-alive",
api_1  |         "content-length": "64",
api_1  |         "accept": "application/json, text/plain, */*",
api_1  |         "user-agent": "Mozilla/5.0 (Linux; Android 11; Pixel 5)...",
api_1  |         "content-type": "application/json",
api_1  |         "origin": "http://localhost:3003",
api_1  |         "sec-fetch-site": "same-site",
api_1  |         "sec-fetch-mode": "cors",
api_1  |         "sec-fetch-dest": "empty",
api_1  |         "referer": "http://localhost:3003/",
api_1  |         "accept-encoding": "gzip, deflate, br",
api_1  |         "accept-language": "en-US,en;q=0.9"
api_1  |       },
api_1  |       "body": {
api_1  |         "email": "esteban.cordoba@moove-it.com",
api_1  |         "password": "[Redacted]"
api_1  |       }
api_1  |     }
api_1  |     res: {
api_1  |       "status": 422
api_1  |     }
```

## `errorHandlerMiddleware`

Errors are caught and logged by this middleware.

### loggerOnly

Expected errors are also sent as-is to as a response.

If there is some data you want to log but not send in the response, use the `loggerOnly` key.
```
throw new UnprocessableEntity({ details: 'Invalid token', loggerOnly: 'test' })
```

Example of an error logged by the `errorHandlerMiddleware`

```
api_1  | [1648228365316] ERROR (111 on da0085b7fd38):
api_1  |     reqId: "c05ee9d1-b5a2-4e8e-80fe-adf68304a64d"
api_1  |     err: {
api_1  |       "type": "UnprocessableEntity",
api_1  |       "message": "UnprocessableEntity",
api_1  |       "stack":
api_1  |           Error: UnprocessableEntity
api_1  |               at loginInner (/app/src/lib/auth/auth.service.js:46:17)
api_1  |               at /app/src/lib/auth/auth.service.js:73:32
api_1  |               at callback (/app/node_modules/koa-passport/lib/framework/koa.js:93:25)
api_1  |               at Strategy.strategy.error (/app/node_modules/passport/lib/middleware/authenticate.js:358:18)
api_1  |               at verified (/app/node_modules/passport-local/lib/strategy.js:81:28)
api_1  |               at Strategy.auth [as _verify] (/app/src/passport/strategies.js:87:9)
api_1  |               at processTicksAndRejections (internal/process/task_queues.js:93:5)
api_1  |       "details": "Invalid credentials",
api_1  |       "loggerOnly": "test"
api_1  |     }
```

## Customizing the logger

The logger is initialized in `src/utils/logger.js`, with a call to `initializeLogger`. It receives an optional options object.

Possible options of the `initializeLogger` call are described below.

### sensitiveFields

*Default: `[/password/i]`*

Notice how the `password` key in the body of the above example is `[Redacted]`.

Each element in the `sensitiveFields` array is a regex. Any key in the logged object that matches this regex will have its value replaced with `[Redacted]` in the logs.

Keys are checked recursively, so if for example you log either `{ password }` or `{ userData: { password } }` it will be redacted in both cases (up to a depth of 10)

It's good practice to configure it to avoid logging any user credentials, tokens, or any other sensitive information sent in the requests.

Note: `password` is left as a default due to its common use in applications with authorization. If you don't need to redact any information, passing `[]` might improve the performance of the logger.

### redactedKeys

*Default: `['req.headers.authorization', 'req.headers.cookie']`*

If you know the exact path of a key you want to generally redact, you can use `redactedKeys`.

Each element in the `redactedKeys` array is a string with a path to a key. If any of those keys are found in the logged object they will have their value replaced with `[Redacted]` in the logs.

Useful for redacting sensitive headers. See https://github.com/pinojs/pino/blob/master/docs/redaction.md
