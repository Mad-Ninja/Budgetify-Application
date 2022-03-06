const express = require('express');
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
  
  module.exports = router;