const express = require('express');
const {
  addUser, editUser, getUser, deleteUser,
} = require('../controllers/users');

const router = express.Router();

router.post('/', addUser);

router.put('/:id', editUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

module.exports = router;