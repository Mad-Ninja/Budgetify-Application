import express from 'express';
import {
  addUser, editUser, getUser, deleteUser,
} from '../controllers/users.js';

const router = express.Router();

router.post('/', addUser);

router.put('/:id', editUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

export default router;