const express = require('express');
const router = express.Router();
const trainersController = require('../controllers/trainersController');

router.get('/', trainersController.index);

module.exports = router;