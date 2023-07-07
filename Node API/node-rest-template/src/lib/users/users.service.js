const { User } = require('./users.model');

const all = () => User.query();

module.exports = { all };
