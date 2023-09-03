const loginService = require('../../../../lib/auth');
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const accessToken = await loginService.login({ email, password });

    const response = {
      code: 200,
      message: 'login successful',
      data: {
        access_token: accessToken,
        links: {
          self: req.url,
        },
      },
    };
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = login;
