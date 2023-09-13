const defaults = require('../../config/defaults');
const { Utility } = require('../../model');

const { notFound } = require('../../utils/error');

const findAllUtility = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType == 'dsc' ? '-' : ''}${sortBy}`;
  const filter = {
    name: { $regex: search, $options: 'i' },
  };

  const utilities = await Utility.find(filter)
    .populate({ path: 'author', select: 'name' })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return utilities.map((utility) => ({
    ...utility._doc,
    id: utility.id,
  }));
};

const count = ({ search = '' }) => {
  const filter = {
    name: { $regex: search, $options: 'i' },
  };
  return Utility.count(filter);
};

// Create new utility
const createUtility = async ({
  name,
  flatNo,
  ElectricityBill = '',
  GasBill = '',
  InternetBill = '',
  ServiceCharge = '',
  status = 'draft',
  author,
}) => {
  if (!name || !author) {
    const error = new Error('Invalid parameters');
    error.status = 400;
    throw error;
  }
  const utility = new Utility({
    name,
    flatNo,
    ElectricityBill,
    GasBill,
    InternetBill,
    ServiceCharge,
    status,
    author: author.id,
  });
  await utility.save();
  return {
    ...utility._doc,
    id: utility.id,
  };
};

// Find single item
const findSingleItem = async ({ id, expand = '' }) => {
  if (!id) throw new Error('Id is required');

  const utility = await Utility.findById(id);
  if (!utility) {
    throw notFound();
  }
  if (expand.includes('author')) {
    await utility.populate({
      path: 'author',
      select: 'name',
    });
  }

  return {
    ...utility._doc,
    id: utility.id,
  };
};

//updateItem
const updateOrCreate = async (
  id,
  {
    name,
    author,
    flatNo,
    ElectricityBill,
    GasBill,
    InternetBill,
    ServiceCharge,
    status = 'draft',
  }
) => {
  const utility = await Utility.findById(id);
  if (!utility) {
    const utility = await create({
      name,
      author,
      flatNo,
      ElectricityBill,
      GasBill,
      InternetBill,
      ServiceCharge,
      status,
    });
    return { utility, code: 201 };
  }
  const payload = {
    name,
    flatNo,
    ElectricityBill,
    GasBill,
    InternetBill,
    ServiceCharge,
    status,
    author: author.id,
  };
  utility.overwrite(payload);
  await utility.save();

  return { utility: { ...utility._doc, id: utility.id }, code: 200 };
};

const updateProperties = async (
  id,
  {
    name,
    flatNo,
    ElectricityBill,
    GasBill,
    InternetBill,
    ServiceCharge,
    status,
  }
) => {
  const utility = await Utility.findById(id);
  if (!utility) {
    throw notFound();
  }
  const payload = {
    name,
    flatNo,
    ElectricityBill,
    GasBill,
    InternetBill,
    ServiceCharge,
    status,
  };

  Object.keys(payload).forEach((key) => {
    utility[key] = payload[key] ?? utility[key];
  });
  await utility.save();
  return { ...utility._doc, id: utility.id };
};

const removeItem = async (id) => {
  const utility = await Utility.findById(id);
  if (!utility) {
    throw notFound();
  }
  return Utility.findByIdAndDelete(id);
};

const checkOwnership = async ({ resourceId, userId }) => {
  const utility = await Utility.findById(resourceId);
  if (!utility) throw notFound();

  if (utility._doc.author.toString() === userId) {
    return true;
  }
  return false;
};

module.exports = {
  findAllUtility,
  createUtility,
  count,
  findSingleItem,
  updateOrCreate,
  updateProperties,
  removeItem,
  checkOwnership,
};
