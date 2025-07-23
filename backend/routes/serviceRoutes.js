const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/salons/:salonId/services', serviceController.getServicesBySalon);
router.post('/', serviceController.addService);
router.patch('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);


 module.exports = router;
