const utilityService = require('../../../../lib/utility');

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const status = req.body.status || 'draft';

  try {
    const { utility, code } = await utilityService.updateOrCreate(id, {
      name: req.body.name,
      flatNo: req.body.flatNo,
      ElectricityBill: req.body.ElectricityBill,
      GasBill: req.body.GasBill,
      InternetBill: req.body.InternetBill,
      ServiceCharge: req.body.ServiceCharge,
      author: req.user,
      status,
    });
    const response = {
      code,
      message:
        code === 200
          ? 'Utility update Successfully'
          : 'Utility created Successfully',
      data: utility,
      links: {
        self: `/utility/${utility.id}`,
      },
    };

    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
