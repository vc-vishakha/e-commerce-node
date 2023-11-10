const express = require('express');
const router = express.Router();
const user = require('./user');
const auth = require('./auth');
const product = require('./product');
const authJWT = require("../middleware/auth-validator");


router.use('/', auth);
router.use('/product', authJWT.authenticateToken, product);
router.use('/user', authJWT.authenticateToken, user);
module.exports = router;