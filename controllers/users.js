import { ObjectId } from 'mongodb';
import User from '../models/users.js';

const mongoObjectId = function () {
  let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};

async function addUser(req, res) {
  try {
    const copyOfUser = req.body;
    copyOfUser._id = new ObjectId(mongoObjectId());
    const user = await User.create(copyOfUser);
    res.status(200).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function editUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      req.body,
    );
    res.status(200).json({ message: 'User edited' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getUser(req, res) {
  const id = new ObjectId(req.params.id);
  const user = await User.findOne({ _id: id });
  res.status(200).json(user);
}

async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete(
      { _id: new ObjectId(req.params.id) },
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
  mongoObjectId,
};
