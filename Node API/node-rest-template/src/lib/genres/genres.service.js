const { Genre } = require('./genres.model');

const all = () => Genre.query();

module.exports = { all };
