jest.mock('../../src/lib/genres/genres.service.js');

const request = require('supertest');
const qs = require('qs');
const { initializeApp } = require('../../lib');
const { screen } = require('jest');

const errorCodeToStatusMap = require('../../src/config/errorCodeToStatusMap');
const genresService = require('../../src/lib/genres/genres.service');
const genresRouter = require('../../src/web/genres.router');
const { genre1, genre2 } = require('../fixtures/genres');

describe('genres/router', () => {
  const app = initializeApp({ router: genresRouter, errorCodeToStatusMap });
  const server = app.listen();

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    beforeEach(() => {
      const serviceResponse = {
        genres: [genre1, genre2],
        total: 2,
      };
      genresService.all.mockImplementation(() => serviceResponse);
    });

    const itSendsExpectedResponse = ({ page, pageSize }, query) => {
      it('sends the expected response', async () => {
        const response = await request(server).get('/').query(query);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          genres: [{ name: genre1.name }, { name: genre2.name }],
          pageData: { total: 2, page, pageSize },
        });
      });
    };

    const defaultPageConfig = { page: 0, pageSize: 20 };

    describe('when no query is passed', () => {
      const query = undefined;

      it('passes default page config to the service', async () => {
        await request(server).get('/').query(query);
        expect(genresService.all).toHaveBeenCalledWith({ pageConfig: defaultPageConfig });
      });

      itSendsExpectedResponse(defaultPageConfig);
    });

    // describe('when a query is passed', () => {
    //   describe('when pagination parameters are passed', () => {
    //     const query = { page: 2, pageSize: 5 };

    //     it('passes them to the service', async () => {
    //       await request(server).get('/').query(query);
    //       expect(genresService.all).toHaveBeenCalledWith({ pageConfig: { page: 2, pageSize: 5 } });
    //     });

    //     itSendsExpectedResponse({ page: 2, pageSize: 5 }, query);
    //   });

    //   describe('when invalid pagination parameters are passed', () => {
    //     const query = { page: 'hola', pageSize: 5 };

    //     it('throws a validation error', async () => {
    //       const response = await request(server).get('/').query(query);
    //       expect(response.status).toBe(400);
    //       expect(response.body).toEqual({
    //         error: { details: '"page" must be a number' },
    //       });
    //     });
    //   });

    //   describe('when ids are passed in bracket format (ids[]=123&ids[]=234)', () => {
    //     describe('when there is a single item in the array', () => {
    //       const query = qs.stringify({ ids: [123] }, { arrayFormat: 'brackets' });

    //       it('passes it to the service properly', async () => {
    //         await request(server).get('/').query(query);
    //         expect(genresService.all).toHaveBeenCalledWith({
    //           ids: ['123'],
    //           pageConfig: defaultPageConfig,
    //         });
    //       });

    //       itSendsExpectedResponse(defaultPageConfig, query);
    //     });

    //     describe('when there are multiple items in the array', () => {
    //       const query = qs.stringify({ ids: [123, 234] }, { arrayFormat: 'brackets' });

    //       it('passes it to the service properly', async () => {
    //         await request(server).get('/').query(query);
    //         expect(genresService.all).toHaveBeenCalledWith({
    //           ids: ['123', '234'],
    //           pageConfig: defaultPageConfig,
    //         });
    //       });

    //       itSendsExpectedResponse(defaultPageConfig, query);
    //     });
    //   });

    //   describe('when ids are passed in repeat format (ids=123&ids=234)', () => {
    //     describe('when there is a single id in the array', () => {
    //       const query = qs.stringify({ ids: [123] }, { arrayFormat: 'repeat' });

    //       it('passes it to the service, but as a string instead of an array', async () => {
    //         await request(server).get('/').query(query);
    //         expect(genresService.all).toHaveBeenCalledWith({
    //           ids: '123',
    //           pageConfig: defaultPageConfig,
    //         });
    //       });

    //       itSendsExpectedResponse(defaultPageConfig, query);
    //     });

    //     describe('when there are multiple items in the array', () => {
    //       const query = qs.stringify({ ids: [123, 234] }, { arrayFormat: 'repeat' });

    //       it('passes it to the service properly', async () => {
    //         await request(server).get('/').query(query);
    //         expect(genresService.all).toHaveBeenCalledWith({
    //           ids: ['123', '234'],
    //           pageConfig: defaultPageConfig,
    //         });
    //       });

    //       itSendsExpectedResponse(defaultPageConfig, query);
    //     });
    //   });

    //   describe('when ids and pagination parameters are passed', () => {
    //     const query = qs.stringify(
    //       { ids: [123], page: 2, pageSize: 5 },
    //       { arrayFormat: 'brackets' },
    //     );

    //     it('passes them to the service', async () => {
    //       await request(server).get('/').query(query);
    //       expect(genresService.all).toHaveBeenCalledWith({
    //         pageConfig: { page: 2, pageSize: 5 },
    //         ids: ['123'],
    //       });
    //     });

    //     itSendsExpectedResponse({ page: 2, pageSize: 5 }, query);
    //   });
    // });
  });
});
