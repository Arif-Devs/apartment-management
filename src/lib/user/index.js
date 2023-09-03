const User = require('../../model/User');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  } else {
    false;
  }
};

const userExist = async (email) => {
  const user = await findUserByEmail(email);
  if (user) {
    return true;
  } else {
    false;
  }
};
const createUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  user.save();
  return { ...user._doc, id: user.id };
};

module.exports = { userExist, createUser, findUserByEmail };
