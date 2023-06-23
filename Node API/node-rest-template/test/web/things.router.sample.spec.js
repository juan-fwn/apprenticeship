jest.mock('../../src/lib/things.sample/things.service');

const request = require('supertest');
const qs = require('qs');
const { initializeApp } = require('../../lib');

const errorCodeToStatusMap = require('../../src/config/errorCodeToStatusMap');
const thingsService = require('../../src/lib/things.sample/things.service');
const thingsRouter = require('../../src/web/things.router.sample');
const { thing1, thing2 } = require('../fixtures/things.sample');

describe('things/router', () => {
  const app = initializeApp({ router: thingsRouter, errorCodeToStatusMap });
  const server = app.listen();

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    beforeEach(() => {
      const serviceResponse = {
        results: [thing1, thing2],
        total: 2,
      };
      thingsService.all.mockImplementation(() => serviceResponse);
    });

    const itSendsExpectedResponse = ({ page, pageSize }, query) => {
      it('sends the expected response', async () => {
        const response = await request(server).get('/').query(query);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          things: [{ name: thing1.name }, { name: thing2.name }],
          pageData: { total: 2, page, pageSize },
        });
      });
    };

    const defaultPageConfig = { page: 0, pageSize: 20 };

    describe('when no query is passed', () => {
      const query = undefined;

      it('passes default page config to the service', async () => {
        await request(server).get('/').query(query);
        expect(thingsService.all).toHaveBeenCalledWith({ pageConfig: defaultPageConfig });
      });

      itSendsExpectedResponse(defaultPageConfig);
    });

    describe('when a query is passed', () => {
      describe('when pagination parameters are passed', () => {
        const query = { page: 2, pageSize: 5 };

        it('passes them to the service', async () => {
          await request(server).get('/').query(query);
          expect(thingsService.all).toHaveBeenCalledWith({ pageConfig: { page: 2, pageSize: 5 } });
        });

        itSendsExpectedResponse({ page: 2, pageSize: 5 }, query);
      });

      describe('when invalid pagination parameters are passed', () => {
        const query = { page: 'hola', pageSize: 5 };

        it('throws a validation error', async () => {
          const response = await request(server).get('/').query(query);
          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            error: { details: '"page" must be a number' },
          });
        });
      });

      describe('when ids are passed in bracket format (ids[]=123&ids[]=234)', () => {
        describe('when there is a single item in the array', () => {
          const query = qs.stringify({ ids: [123] }, { arrayFormat: 'brackets' });

          it('passes it to the service properly', async () => {
            await request(server).get('/').query(query);
            expect(thingsService.all).toHaveBeenCalledWith({
              ids: ['123'],
              pageConfig: defaultPageConfig,
            });
          });

          itSendsExpectedResponse(defaultPageConfig, query);
        });

        describe('when there are multiple items in the array', () => {
          const query = qs.stringify({ ids: [123, 234] }, { arrayFormat: 'brackets' });

          it('passes it to the service properly', async () => {
            await request(server).get('/').query(query);
            expect(thingsService.all).toHaveBeenCalledWith({
              ids: ['123', '234'],
              pageConfig: defaultPageConfig,
            });
          });

          itSendsExpectedResponse(defaultPageConfig, query);
        });
      });

      describe('when ids are passed in repeat format (ids=123&ids=234)', () => {
        describe('when there is a single id in the array', () => {
          const query = qs.stringify({ ids: [123] }, { arrayFormat: 'repeat' });

          it('passes it to the service, but as a string instead of an array', async () => {
            await request(server).get('/').query(query);
            expect(thingsService.all).toHaveBeenCalledWith({
              ids: '123',
              pageConfig: defaultPageConfig,
            });
          });

          itSendsExpectedResponse(defaultPageConfig, query);
        });

        describe('when there are multiple items in the array', () => {
          const query = qs.stringify({ ids: [123, 234] }, { arrayFormat: 'repeat' });

          it('passes it to the service properly', async () => {
            await request(server).get('/').query(query);
            expect(thingsService.all).toHaveBeenCalledWith({
              ids: ['123', '234'],
              pageConfig: defaultPageConfig,
            });
          });

          itSendsExpectedResponse(defaultPageConfig, query);
        });
      });

      describe('when ids and pagination parameters are passed', () => {
        const query = qs.stringify(
          { ids: [123], page: 2, pageSize: 5 },
          { arrayFormat: 'brackets' },
        );

        it('passes them to the service', async () => {
          await request(server).get('/').query(query);
          expect(thingsService.all).toHaveBeenCalledWith({
            pageConfig: { page: 2, pageSize: 5 },
            ids: ['123'],
          });
        });

        itSendsExpectedResponse({ page: 2, pageSize: 5 }, query);
      });
    });
  });

  describe('POST /', () => {
    describe('with valid attributes', () => {
      const requestBody = { thing: { name: 'a', category_id: 1 } };

      beforeEach(() => {
        const serviceResponse = {
          ...thing1,
          category: { name: 'catcat', things: [thing1, thing2] },
        };
        thingsService.create.mockImplementation(() => serviceResponse);
      });

      it('sends the expected response', async () => {
        const response = await request(server).post('/').send(requestBody);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ name: thing1.name, category: { name: 'catcat' } });
      });
    });
  });
});
