import User from './models/users.js';

const adminGuard = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });

  if (user && user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not admin' });
  }
};

export {
  adminGuard,
};