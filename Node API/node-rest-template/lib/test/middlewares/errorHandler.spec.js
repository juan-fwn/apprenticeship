const request = require('supertest');
const Koa = require('koa');
const errorHandlerMiddleware = require('../../middlewares/errorHandler');

describe('errorHandlerMiddleware', () => {
  const testErrorCode = 'TEST_ERROR_CODE';
  const testErrorMap = { [testErrorCode]: 400 };
  let app;
  let server;

  beforeEach(() => {
    app = new Koa();
    app.use(errorHandlerMiddleware(testErrorMap));
    server = app.listen();
  });

  afterEach(() => {
    server.close();
  });

  describe('when there is no error', () => {
    it('returns the expected status and response', async () => {
      app.use((ctx) => {
        ctx.status = 203;
        ctx.body = { value: 'testing' };
      });
      const response = await request(server).get('/');
      expect(response.status).toEqual(203);
      expect(response.body).toEqual({ value: 'testing' });
    });
  });

  describe('when there is an error', () => {
    describe('and it is expected', () => {
      const appError = { value: 'testing error', code: testErrorCode };

      it('returns the expected status and response', async () => {
        app.use(() => {
          throw appError;
        });
        const response = await request(server).get('/');
        expect(response.status).toEqual(testErrorMap[testErrorCode]);
        expect(response.body).toEqual({ error: appError });
      });
    });

    describe('and it is NOT expected', () => {
      const appError = { value: 'testing error', code: 'Some unexpected code' };

      it('returns 500 and a generic response', async () => {
        app.use(() => {
          throw appError;
        });
        const response = await request(server).get('/');
        expect(response.status).toEqual(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
      });
    });
  });
});
