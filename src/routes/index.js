const router = require('express').Router();
const { controllers: utilityController } = require('../api/v1/utility');
const { controllers: authController } = require('../api/v1/auth');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const ownership = require('../middleware/checkOwner');

router.post('/api/v1/auth/register', authController.register);
router.post('/api/v1/auth/login', authController.login);

router
  .route('/api/v1/utilities')
  .get(utilityController.findAll)
  .post(
    authenticate,
    authorize(['admin', 'user']),
    utilityController.createUtility
  );
router
  .route('/api/v1/utilities/:id')
  .get(utilityController.findSingleItem)
  .put(authenticate, authorize(['admin']), utilityController.updateItem)
  .patch(
    authenticate,
    authorize(['admin']),
    utilityController.updateItemByPatch
  )
  .delete(
    authenticate,
    authorize(['admin']),
    ownership('Utility'),
    utilityController.removeItem
  );

module.exports = router;
