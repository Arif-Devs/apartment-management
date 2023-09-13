require('dotenv').config();
const jwt = require('jsonwebtoken');
const { serverError } = require('../utils/error');

/***
 * 1. Check access token is missing or not
 * 2. if have access token then check is it valid and if yes then allow to process request
 * 3. if can't find access token then return 401 response
 */

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'token invalid' });
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'access token not valid' });
    }
    req.user = user;
    next();
  });
};

//module.exports = authToken;

//new Access & Refresh Token
const generateNewToken = ({
  payload,
  algorithm = 'HS256',
  secret = process.env.ACCESS_TOKEN_SECRET,
  expiresIn,
}) => {
  try {
    const accToken = jwt.sign(
      payload,
      secret,
      { algorithm },
      (expiresIn = '1hr')
    );
    const refToken = jwt.sign(
      payload,
      secret,
      { algorithm },
      (expiresIn = '7day')
    );

    return { accToken, refToken };
  } catch (err) {
    throw serverError();
  }
};
