require('./testHelper');
require('./knexTestHelper');

const nock = require('nock');
const axios = require('axios');
const axiosNodeAdapter = require('axios/lib/adapters/http');

// https://www.npmjs.com/package/nock#axios
axios.defaults.adapter = axiosNodeAdapter;

beforeAll(() => {
  nock.disableNetConnect();
  // localhost should be enabled in order to avoid supertest interceptors rejection
  nock.enableNetConnect('127.0.0.1');
});

afterAll(() => {
  nock.restore();
  nock.enableNetConnect();
});

afterEach(() => {
  const pendingMocks = nock.pendingMocks();
  if (pendingMocks.length) {
    nock.cleanAll();
    // this makes the tests more robust by ensuring all specified requests were executed
    throw new Error(`Not all interceptors were used:\n${pendingMocks.join('\n')}`);
  }
  nock.cleanAll();
});
