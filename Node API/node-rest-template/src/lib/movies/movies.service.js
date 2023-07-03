const { Movie } = require('./movies.model');

const all = ({
  pageConfig: { page, pageSize },
  ids = null,
  sortDirection = null,
  sortField = null,
  filter = null,
}) => {
  const [filterField, filterValue] = filter ? filter.split(':') : [null, null];

  let parsedIds = null;

  if (typeof ids === 'string') {
    parsedIds = JSON.parse(ids);
  } else if (Array.isArray(ids)) {
    parsedIds = ids;
  }

  return Movie.query()
    .modify((qb) => {
      if (parsedIds) {
        qb.findByIds(parsedIds);
      }
      if (filterField && filterValue) {
        qb.where(filterField, 'like', `%${filterValue}%`);
      }
      if (sortField && sortDirection) {
        qb.orderBy(sortField, sortDirection);
      }
    })
    .returning('*')
    .withGraphFetched('[genres]')
    .page(page, pageSize);
};

module.exports = { all };
