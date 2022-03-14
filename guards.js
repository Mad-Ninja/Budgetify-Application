const {getUserByEmail} = require('./database/users');

const adminGuard = (req, res, next) => {
  const user = getUserByEmail(req.user.email);

  if (user && user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not admin' });
  }
}

module.exports = {
  adminGuard,
}