const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const constants = require('../constants');
const { User } = require('../lib/users/users.model');
const { compareHash } = require('../utils/hash');

const localStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    const user = await User.query().findOne('email', email);

    if (user && compareHash(password, user.password_hash)) {
      done(null, user);
    } else {
      done(new Error('User not found'), null);
    }
  },
);

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtStrategyOptions, (jwtPayload, done) => {
  done(null, jwtPayload);
});

module.exports = [
  { alias: 'local', concreteStrategy: localStrategy },
  { alias: 'jwt', concreteStrategy: jwtStrategy },
];
