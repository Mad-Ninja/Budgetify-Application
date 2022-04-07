import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import Transaction from '../models/transactions.js';

async function addTransaction(req, res) {
  try {
    const requestBody = req.body;
    requestBody.accountId = req.params.accountId;
    requestBody._id = uuidv4();
    const transaction = await Transaction.create(requestBody);
    res.status(200).json({ message: 'Transaction created' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function editTransaction(req, res) {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Transaction edited' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getTransaction(req, res) {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getAllTransactions(req, res) {
  try {
    const transactions = await Transaction.find({ accountId: req.params.accountId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json(err);
  }
}
async function deleteTransaction(req, res) {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(400).json(err);
  }
}

export {
  addTransaction,
  editTransaction,
  getTransaction,
  getAllTransactions,
  deleteTransaction,
};