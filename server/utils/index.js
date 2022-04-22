const config = require('../config');

const { pagination } = config;

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

function populateToObject(populateNames) {
  const virtualNames = Object.getOwnPropertyNames(virtuals);
  return populateNames.map((item) => {
    let options = {};
    if (virtualNames.includes(item)) {
      options = {
        limit: populate.virtuals.limit,
      };
    }
    return {
      path: item,
      options,
    };
  });
}

module.exports = { paginationParams, populateToObject };
