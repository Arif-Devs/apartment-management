const utilityService = require('../../../../lib/utility');

const removeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const utility = await utilityService.removeItem(id);

    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
