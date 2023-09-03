const { userExist, createUser, findUserByEmail } = require('../user');
const { badRequest } = require('../../utils/error');
const { generateHash, hashMatched } = require('../../utils/hash');
const { generateToken } = require('../token');

const register = async ({ name, email, password }) => {
  const hasUser = await userExist(email);
  if (hasUser) {
    throw badRequest('User Exist');
  }

  password = await generateHash(password);
  const user = await createUser({ name, email, password });

  return user;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw badRequest('Invalid credentials');
  }
  const matchPassword = await hashMatched(password, user.password);
  if (!matchPassword) {
    throw badRequest('Invalid credentials');
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = generateToken({ payload });
  return token;
};

module.exports = { register, login };
