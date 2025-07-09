const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/api/salons/:salonId/services', serviceController.getServicesBySalon);
router.post('/api/services', serviceController.addService);
router.patch('/api/services/:id', serviceController.updateService);
router.delete('/api/services/:id', serviceController.deleteService);


 module.exports = router;
