const express = require('express');
const router = express.Router();
const controller = require('../controllers/calendarController');

// Ruta za dohvat podataka za prikaz kalendara
router.get('/month', controller.getMonthData);
// Ruta za cuvanje izmjene jednog dana
router.post('/day', controller.saveDayOverride);
// Ruta za mijenjanje defaultnog sablona
router.put('/default', controller.updateDefault);

module.exports = router;