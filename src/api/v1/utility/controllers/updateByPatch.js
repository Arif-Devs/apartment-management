const utilityService = require('../../../../lib/utility');

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;

  try {
    const utility = await utilityService.updateProperties(id, {
      name: req.body.name,
      flatNo: req.body.flatNo,
      ElectricityBill: req.body.ElectricityBill,
      GasBill: req.body.GasBill,
      InternetBill: req.body.InternetBill,
      ServiceCharge: req.body.ServiceCharge,
    });
    const response = {
      code: 200,
      message: 'Utility update Successfully',

      data: utility,
      links: {
        self: `/utility/${utility.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItemPatch;
