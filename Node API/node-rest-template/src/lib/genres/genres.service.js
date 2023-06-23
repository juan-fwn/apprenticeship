const axios = require('axios');
const constants = require('../../constants');

const { Genre } = require('./genres.model');

const all = ({ pageConfig: { page, pageSize }, ids = null }) =>
  Genre.query()
    .modify((qb) => {
      if (Array.isArray(ids)) {
        qb.findByIds(ids);
      }
    })
    // .modify('active')
    .returning('*')
    // .withGraphFetched('[category.[things], genres]')
    .page(page, pageSize);

module.exports = { all };
