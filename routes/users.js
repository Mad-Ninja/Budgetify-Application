
let users = require ('../database/users.js');
const express = require('express');
const router = express.Router();



  
  router.post('/', (req, res) => {
    users.push(req.body);
    console.log(req.body);  
    res.send('account created');
  });

  router.put('/:id', (req, res) => {
      users[req.params.id] = req.body;
    res.send('account edited');
  });

  router.get('/:id', (req, res) => {
    let account = users[req.params.id];      
    res.json({account});  
    
  });
  
  router.delete('/:id', (req, res) => {
    users.splice(req.params.id,1);  
    res.send('account deleted');
  });
  
  module.exports = router;