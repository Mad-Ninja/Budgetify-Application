import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import Account from '../models/accounts.js';

async function addAccount(req, res) {
  try {
    const decodedToken = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, 'super_secret');
    const requestBody = req.body;
    requestBody.userId = decodedToken.id;
    requestBody._id = uuidv4();
    const account = await Account.create(requestBody);
    res.status(200).json({ message: 'Account created' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function editAccount(req, res) {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Account edited' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getAccount(req, res) {
  try {
    const account = await Account.findById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getAllAccounts(req, res) {
  try {
    const decodedToken = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, 'super_secret');
    const accounts = await Account.find({ userId: decodedToken.id });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).json(err);
  }
}
async function deleteAccount(req, res) {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    res.status(400).json(err);
  }
}

export {
  addAccount,
  editAccount,
  getAccount,
  getAllAccounts,
  deleteAccount,
};