import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const payload = {
      id: user._id, 
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      password: req.body.password,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export {
  loginUser,
};
