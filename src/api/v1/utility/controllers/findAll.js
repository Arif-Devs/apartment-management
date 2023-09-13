const utilityService = require('../../../../lib/utility');
const { query } = require('../../../../utils');
const defaults = require('../../../../config/defaults');

const findAll = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const sortType = req.query.sort_type || defaults.sortType;
  const search = req.query.search || defaults.search;

  try {
    const utilities = await utilityService.findAllUtility({
      page,
      limit,
      sortBy,
      sortType,
      search,
    });
    const data = query.transformedDataItems({
      items: utilities,
      path: '/utilities',
      selection: ['id', 'name', 'flatNo', 'author', 'createdAt', 'updatedAt'],
    });

    //Pagination
    const totalItems = await utilityService.count({ search });
    const pagination = query.getPagination({ totalItems, limit, page });

    //Hateoas
    const links = query.hateoas({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({ data, pagination, links });
  } catch (e) {
    next(e);
  }
};

module.exports = findAll;
