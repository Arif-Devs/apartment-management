const registerService = require('../../../../lib/auth');
const { createToken } = require('../../../../lib/token/createToken');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerService.register({ name, email, password });

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = createToken({ payload });

    const response = {
      code: 201,
      message: 'Signup Successful',
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
        login: '/auth/login',
      },
    };
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = register;
