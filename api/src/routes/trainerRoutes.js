const express = require('express');
const router = express.Router();
const trainersController = require('../controllers/trainersController');
const {authenticate} = require('../middleware/auth');

router.get('/', trainersController.index);
router.post('/google-login', trainersController.googleLogin);
router.post('/login', trainersController.login);
router.post('/logout', trainersController.logout);
router.get('/verifyToken', authenticate, trainersController.verifyToken);
module.exports = router;