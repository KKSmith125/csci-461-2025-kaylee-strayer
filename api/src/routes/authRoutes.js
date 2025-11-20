const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/auth');
const authController = require('../controllers/authController');

router.post('/google-login', authController.googleLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/verifyToken', authenticate, authController.verifyToken);

module.exports = router;