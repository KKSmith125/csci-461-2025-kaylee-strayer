const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientsController');
const {validateClient} = require('../middleware/recordValidation');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', validateClient, controller.create);
router.put('/:id', validateClient, controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;