const { authorizationError } = require('../utils/error');
const utilityService = require('../lib/utility');

const ownership =
  (model = '') =>
  async (req, res, next) => {
    if (model === 'Utility') {
      const owner = await utilityService.checkOwnership({
        resourceId: req.params.id,
        userId: req.user.id,
      });
      if (owner) {
        return next();
      }
      return next(authorizationError());
    }
  };

module.exports = ownership;
