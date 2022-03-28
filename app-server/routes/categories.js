import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Category created');
});

router.put('/', (req, res) => {
  res.send('Category edited');
});

router.get('/', (req, res) => {
  res.send('Category readed');
});

router.delete('/', (req, res) => {
  res.send('Category deleted');
});

export default router;