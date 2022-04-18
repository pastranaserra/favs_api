const { pagination } = require('../config');

function paginationParams(
  limit = pagination.limit,
  page = pagination.page,
  skip,
) {
  return {
    limit: parseInt(limit, 10),
    page: skip ? 0 : parseInt(page, 10),
    skip: skip ? parseInt(skip, 10) : (page - 1) * limit,
  };
}

module.exports = { paginationParams };
