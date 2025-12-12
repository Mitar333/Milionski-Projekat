// backend/routes/ownerRoutes.js

const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const { verifyToken, authorizeRole, authorizeSalonAccess } = require('../utils/authMiddleware'); // Uvezi auth middleware

// ====================================================================
// RUTNE ZA UPRAVLJANJE VLASNIKOM I NJEGOVIM SALONIMA
// ====================================================================

// @route   POST /api/owners/me/salons
// @desc    Vlasnik kreira dodatni salon i povezuje ga sa svojim profilom.
// @access  Private (Owner only)
router.post(
  '/me/salons',
  verifyToken,        // Proveri JWT token
  authorizeRole('owner'), // Samo vlasnik može kreirati dodatni salon
  ownerController.createAdditionalSalon
);

// @route   PUT /api/owners/me/salons/:salonId
// @desc    Vlasnik ažurira specifičan salon koji mu pripada.
// @access  Private (Owner only)
router.put(
  '/me/salons/:salonId',
  verifyToken,        // Proveri JWT token
  authorizeRole('owner'), // Samo vlasnik može ažurirati salon
  authorizeSalonAccess,   // Proveri da li vlasnik ima pristup ovom salonu
  ownerController.updateAdditionalSalon
);

// @route   PUT /api/owners/me
// @desc    Ažuriranje profila vlasnika (firstName, lastName, email, phone)
// @access  Private (Owner only)
router.put(
  '/me',
  verifyToken,        // Proveri JWT token
  authorizeRole('owner'), // Samo vlasnik može ažurirati svoj profil
  ownerController.updateOwnerProfile
);

// @route   PUT /api/owners/me/password
// @desc    Dozvola vlasniku da promeni svoju lozinku.
// @access  Private (Owner only)
router.put(
  '/me/password',
  verifyToken,        // Proveri JWT token
  authorizeRole('owner'), // Samo vlasnik može promeniti svoju lozinku
  ownerController.changeOwnersPassword
);

module.exports = router;
