const { authenticationError } = require('../utils/error');
const tokenService = require('../lib/token/createToken');
const userService = require('../lib/user');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decode = tokenService.verifyToken({ token });
    const user = await userService.findUserByEmail(decode.email);

    if (!user) {
      throw authenticationError();
    }

    // if (user.role != 'admin') {
    //   next(
    //     authenticationError(
    //       `Only admin can post utility, Your role is ${user.role}`
    //     )
    //   );
    // }
    if (user.status != 'approved') {
      next(authenticationError(`Your account is ${user.status}`));
    }

    req.user = { ...user._doc, id: user.id };
    next();
  } catch (e) {
    next(authenticationError());
  }
};
module.exports = authenticate;
