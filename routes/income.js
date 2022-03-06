const express = require('express');
const router = express.Router();

router.post('/', (req, res) => { 
    res.send('income created');
  });

  router.put('/', (req, res) => {
    res.send('income edited');
  });

  router.get('/', (req, res) => {       
    res.send('income readed');    
  });
  
  router.delete('/', (req, res) => {   
    res.send('income deleted');
  });
  
  module.exports = router;