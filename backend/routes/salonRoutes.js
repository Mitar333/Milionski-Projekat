// backend/routes/salonRoutes.js

const express = require('express');
const router = express.Router();
const salonController = require('../controllers/salonController');
const { verifyToken, authorizeRole, authorizeSalonAccess } = require('../utils/authMiddleware'); // Uvezi auth middleware

// ====================================================================
// RUTNE ZA UPRAVLJANJE SALONIMA
// ====================================================================

// @route   POST /api/salons
// @desc    Ruta za dodavanje novog salona (ovo bi trebalo da bude zaštićeno, npr. samo Admin ili Owner pri registraciji)
// @access  Private (Admin ili Owner tokom registracije)
// NAPOMENA: Ako ovu rutu koristi samo `authController.registerOwner`, onda ovde ne treba zaštita.
// Ako je ovo zasebna ruta za dodavanje salona (npr. od strane admina), onda je treba zaštititi.
router.post(
  '/',
  // verifyToken, // Ako samo admin/owner može dodati salon
  // authorizeRole('admin', 'owner'), // Ako samo admin/owner može dodati salon
  salonController.addSalon
);

// @route   GET /api/salons/:id
// @desc    Ruta za dohvatanje javnih detalja salona (dostupno svima)
// @access  Public
router.get('/:id', salonController.getPublicSalonDetails);

// @route   GET /api/salons/me
// @desc    Ruta za dohvatanje SVIH salona povezanih sa autentifikovanim vlasnikom
// @access  Private (Owner only)
router.get(
  '/me',
  verifyToken,        // Proveri JWT token
  authorizeRole('owner'), // Samo vlasnik može dohvatiti svoje salone
  salonController.getOwnerSalonDetails
);

// @route   PUT /api/salons/me
// @desc    Ruta za ažuriranje detalja salona za vlasnika
// OPREZ: Kao što je navedeno u kontroleru, ova ruta pretpostavlja da vlasnik ima jedan salon
// ili da uvek ažurira prvi salon. Bolja praksa bi bila koristiti /api/owners/me/salons/:salonId za ažuriranje.
// @access  Private (Owner only)
router.put(
  '/me',
  verifyToken,        // Proveri JWT token
  authorizeRole('owner'), // Samo vlasnik može ažurirati salon
  // authorizeSalonAccess, // Ovo bi bilo potrebno ako bi se ažurirao specifičan salon po ID-u, a ne "me" salon
  salonController.updateSalonDetails
);

// @route   POST /api/salons/me/logo
// @desc    Ruta za upload logotipa salona
// 'logo' je naziv polja u FormData
// @access  Private (Owner only)
router.post(
  '/me/logo',
  verifyToken,        // Proveri JWT token
  authorizeRole('owner'), // Samo vlasnik može uploadovati logo
  salonController.uploadSalonLogo
);

module.exports = router;
