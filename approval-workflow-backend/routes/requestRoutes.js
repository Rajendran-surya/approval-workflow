const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { createRequestValidator, statusUpdateValidator } = require('../validators/requestValidator');

router.post('/', createRequestValidator, requestController.createRequest);
router.get('/', requestController.getRequests);
router.put('/:id/status', statusUpdateValidator, requestController.updateStatus);

module.exports = router;