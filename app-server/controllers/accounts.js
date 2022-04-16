import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

//const decodedToken = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzMDU1YWNiLTUzMzEtNDRjMy1iODQxLTEyMWYxZTA4YjVhMSIsImVtYWlsIjoibmlrb2xheUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDgxODg5NjMsImV4cCI6MTY0ODM2MTc2M30.i8MObGkHHU5516X9DA9AgeOmexY_UyXcickHzZ2USBs", "super_secret")

async function addAccount(req, res) {
  try {
    const decodedToken = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, "super_secret");
    const user = await User.findOne({ _id: decodedToken.id });
    const account = req.body;
    account._id = uuidv4();
    user.accounts.push(account);
    user.save();
    res.status(200).json({ message: 'Account created' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function editAccount(req, res) {
  try {
    const account = req.body;
    account._id = uuidv4();
    const user = await User.updateOne(
      { "accounts._id": req.params.id },
      { "$set": { "accounts.$": account } },
    );
    res.status(200).json({ message: 'Account edited' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getAccount(req, res) {
  try {
    const user = await User.findOne({ "accounts._id": req.params.id }, { "accounts.$": 1 });
    console.log(user);
    res.status(200).json(user.accounts[0]);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteAccount(req, res) {
  try {
    const decodedToken = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, "super_secret");
    const user = await User.updateOne(
      { "_id": decodedToken.id },
      { $pull:{ accounts: { _id: req.params.id } } },
    );
    res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    res.status(400).json(err);
  }
}

export {
  addAccount,
  editAccount,
  getAccount,
  deleteAccount,
};