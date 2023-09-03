const utilityService = require('../../../../lib/utility');

const findSingleItem = async (req, res, next) => {
  const id = req.params.id;
  const expand = req.query.expand || '';

  try {
    const utility = await utilityService.findSingleItem({ id, expand });
    const response = {
      data: utility,
      links: {
        self: `'/utilities/'${utility.id}`,
        author: `/utilities/${utility.id}/author`,
      },
    };
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingleItem;
