const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
// const authMiddleware = require('../middleware/authMiddleware'); // Vaš budući auth middleware

// Pretpostavljamo da će authMiddleware.ownerAuth biti middleware koji proverava
// da li je korisnik autentifikovan kao vlasnik i postavlja req.user.id.

// Ruta za kreiranje dodatnog salona od strane vlasnika
// POST /api/owners/me/salons
// router.post('/me/salons', authMiddleware.ownerAuth, ownerController.createAdditionalSalon);
router.post('/me/salons', ownerController.createAdditionalSalon); // Privremeno bez auth

// Ruta za ažuriranje specifičnog salona od strane vlasnika
// PUT /api/owners/me/salons/:salonId
// router.put('/me/salons/:salonId', authMiddleware.ownerAuth, ownerController.updateAdditionalSalon);
router.put('/me/salons/:salonId', ownerController.updateAdditionalSalon); // Privremeno bez auth

// Ruta za ažuriranje profila vlasnika (firstName, lastName, email, phone)
// PUT /api/owners/me
// router.put('/me', authMiddleware.ownerAuth, ownerController.updateOwnerProfile);
router.put('/me', ownerController.updateOwnerProfile); // Privremeno bez auth

// Ruta za promenu lozinke vlasnika
// PUT /api/owners/me/password
// router.put('/me/password', authMiddleware.ownerAuth, ownerController.changeOwnersPassword);
router.put('/me/password', ownerController.changeOwnersPassword); // Privremeno bez auth

module.exports = router;