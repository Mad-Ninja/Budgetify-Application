const bcrypt = require('bcrypt');
const {getUserByEmail } = require('../database/users');

const loginUser = (email,password) => {
  const user = getUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
};

module.exports = loginUser;