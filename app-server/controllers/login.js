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

    const jwtToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.status(200).send({
      id: user.id,
      email: user.email,
      role: user.role,
      token: jwtToken,
      expiresIn: 60 * 60 * 1000,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export {
  loginUser,
};
