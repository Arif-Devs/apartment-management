const findAll = require('./findAll');
const create = require('./create');
const findSingleItem = require('./findSingleItem');
const updateItem = require('./updateItem');
const updateItemPatch = require('./updateByPatch');
const removeItem = require('./removeItem');

module.exports = {
  findAll,
  create,
  findSingleItem,
  updateItem,
  updateItemPatch,
  removeItem,
};
