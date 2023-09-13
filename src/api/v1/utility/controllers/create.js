const utilityService = require('../../../../lib/utility');
const { Utility } = require('../../../../model');

const createUtility = async (req, res, next) => {
  const {
    name,
    flatNo,
    ElectricityBill,
    GasBill,
    InternetBill,
    ServiceCharge,
    status,
  } = req.body;

  try {
    const utility = await utilityService.createUtility({
      name,
      flatNo,
      ElectricityBill,
      GasBill,
      InternetBill,
      ServiceCharge,
      status,
      author: req.user,
    });
    const response = {
      code: '201',
      message: 'utility created successfully',
      data: { ...utility },
      links: {
        self: `'/utilities/'${utility.id}`,
        author: `/utilities/${utility.id}/author`,
      },
    };
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};
module.exports = createUtility;
