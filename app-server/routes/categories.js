import express from 'express';
import {
  addCategory, editCategory, getCategory, deleteCategory, getAllCategory,
} from '../controllers/categories.js';

const router = express.Router();

router.post('/', addCategory);

router.patch('/:id', editCategory);

router.get('/', getCategory);

router.delete('/:name/:type', deleteCategory);

export default router;