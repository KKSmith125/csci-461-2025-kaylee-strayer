const express = require('express');
const router = express.Router();
const controller = require('../controllers/trainersController');
const {authenticate} = require('../middleware/auth');

router.get('/', controller.index);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/verifyToken', authenticate, controller.verifyToken);

module.exports = router;