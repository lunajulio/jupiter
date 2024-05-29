const express = require('express');
const authController = require('./authController');

const router = express.Router();

//router.get('/login', LoginController.login);
router.post('/login', authController.auth);
//router.get('/register', LoginController.register);
router.post('/register', authController.storeUser);

module.exports = router;