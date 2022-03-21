import express from 'express';
import {
  addAccount, editAccount, getAccount, deleteAccount,
} from '../controllers/accounts.js';

const router = express.Router();

router.post('/', addAccount);

router.put('/:id', editAccount);

router.get('/:id', getAccount);

router.delete('/:id', deleteAccount);

export default router;