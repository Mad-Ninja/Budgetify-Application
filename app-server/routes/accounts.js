import express from 'express';
import {
  addAccount, editAccount, getAccount, deleteAccount, getAllAccounts,
} from "../controllers/accounts.js";

const router = express.Router();

router.post('/', addAccount);

router.patch('/:id', editAccount);

router.get('/', getAllAccounts);

router.get('/:id', getAccount);

router.delete('/:id', deleteAccount);

export default router;