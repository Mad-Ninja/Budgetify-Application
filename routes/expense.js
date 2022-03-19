const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('expense created');
});

router.put('/', (req, res) => {
  res.send('expense edited');
});

router.get('/', (req, res) => {
  res.send('expense readed');
});

router.delete('/', (req, res) => {
  res.send('expense deleted');
});

module.exports = router;