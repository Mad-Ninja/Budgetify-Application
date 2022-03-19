const express = require('express');

const router = express.Router();
const {
  addAccount, editAccount, getAccount, deleteAccount,
} = require('../controllers/accounts');

router.post('/', addAccount);

router.put('/:id', editAccount);

router.get('/:id', getAccount);

router.delete('/:id', deleteAccount);

module.exports = router;