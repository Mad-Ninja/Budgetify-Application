import User from '../models/users.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

async function addUser(req, res) {
  try {
    const user = req.body;
    user._id = uuidv4();
    user.password = bcrypt.hashSync(req.body.password, 10);
    const userTotal = await User.create(user);
    res.status(200).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function editUser(req, res) {
  try {
    const user = req.body;
    user.password = bcrypt.hashSync(req.body.password, 10);
    const userInDb = await User.findOneAndUpdate(
      { _id: req.params.id },
      user,
    );
    res.status(200).json({ message: 'User edited' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getUser(req, res) {
  const user = await User.findOne({ _id: req.params.id });
  res.status(200).json(user);
}

async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete(
      { _id: req.params.id },
    );
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json(err);
  }
}

export {
  addUser,
  editUser,
  getUser,
  deleteUser,
};
