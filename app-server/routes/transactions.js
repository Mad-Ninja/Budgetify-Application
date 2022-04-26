import express from 'express';
import {
  addTransaction, editTransaction, getAllTransactions, getTransaction, deleteTransaction
} from '../controllers/transactions.js';

const router = express.Router();

router.post('/add/:accountId', addTransaction);

router.patch('/:id', editTransaction);

router.get('/all/:accountId', getAllTransactions);

router.get('/:id', getTransaction);

router.delete('/:id', deleteTransaction);

export default router;