const request = require('supertest');

const { initializeApp } = require('../../lib');
const errorCodeToStatusMap = require('../../src/config/errorCodeToStatusMap');

const { User } = require('../../src/lib/users/users.model');
const authRouter = require('../../src/web/auth.router');
const { user1, user2, user3 } = require('../fixtures/users');
const signToken = require('../../src/utils/signToken');
const passportStrategies = require('../../src/passport/strategies');

const users = [user1, user2, user3];

describe('auth/router', () => {
  const app = initializeApp({ router: authRouter, errorCodeToStatusMap, passportStrategies });
  const server = app.listen();

  afterAll(() => {
    server.close();
  });

  describe('POST /', () => {
    beforeEach(async () => {
      await User.query().del();
      await User.query().insert(users);
    });

    it('should return a valid token', async () => {
      const payload = {
        email: 'admin@gmail.com',
        password: 'admin',
      };

      const serviceResponse = { token: signToken(payload) };

      const response = await request(server).post('/login').send(payload);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(serviceResponse);
    });
  });
});
