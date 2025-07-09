const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/salons/:salonId/services', serviceController.getServicesBySalon);
router.post('/services', serviceController.addService);
router.patch('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);


 module.exports = router;
