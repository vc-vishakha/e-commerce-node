const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/auth/login', authController.loginUser);
router.post('/auth/register', authController.registerUser);
router.get('/auth/verify/:verificationCode', authController.verifyUser);

module.exports = router;