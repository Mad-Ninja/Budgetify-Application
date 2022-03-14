const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const loginUser = require('../controllers/login')

router.post('/', (req,res) =>{

    const user = loginUser(req.body.email, req.body.password);

    if(user) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
          }
        
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );
        res.status(200).json({
            id: user.id,
            email: user.email,
            role: user.role,
            password: req.body.password,
            token: `Bearer ${token}`,
          });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }   
});

module.exports = router;