const express = require('express');
const router = express.Router();
const controller = require('../controllers/sessionsController');
const {validateSession} = require('../middleware/recordValidation');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', validateSession, controller.create);
router.put('/:id', validateSession, controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;