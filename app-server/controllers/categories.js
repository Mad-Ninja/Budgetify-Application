import jwt from 'jsonwebtoken';
import User from '../models/users.js';

async function addCategory(req, res) {
  try {
    const decodedToken = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, 'super_secret');
    const user = await User.updateOne(
      { _id: decodedToken.id },
      { $push: { categories: { $each: req.body } } }
    );
    res.status(200).json({ message: 'Category created' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function editCategory(req, res) {
  try {
    const decodedToken = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, 'super_secret');
    const user = await User.updateOne(
      { _id: decodedToken.id, "categories.name": req.params.id }, 
      {$set:{ "categories.$.name": req.body.name} }
    );
    res.status(200).json({ message: 'Category edited' });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getCategory(req, res) {
  try {
    const account = await Account.findById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getAllCategory(req, res) {
  try {
    const decodedToken = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, 'super_secret');
    const accounts = await Account.find({ userId: decodedToken.id });
    if (accounts.length === 0 || accounts == null || accounts === false) {
      res.status(400).json({ message: 'Not found' });
      return;
    }
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteCategory(req, res) {
  try {
    const decodedToken = jwt.verify(`${req.headers.authorization.split(' ')[1]}`, 'super_secret');
    const user = await User.updateOne(
      { "_id": decodedToken.id },
      { $pull: { categories: { name: req.params.id } } },
    );
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json(err);
  }
}

export {
  addCategory,
  editCategory,
  getCategory,
  getAllCategory,
  deleteCategory,
};