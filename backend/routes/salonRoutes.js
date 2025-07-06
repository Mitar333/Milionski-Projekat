const express = require('express');
const router = express.Router(); // Ova linija je ključna
const salonController = require('../controllers/salonController');
// const authMiddleware = require('../middleware/authMiddleware'); // Vaš budući auth middleware

// Ruta za dodavanje novog salona (ovo bi trebalo da bude zaštićeno, npr. samo Admin ili Owner pri registraciji)
// POST /api/salons
router.post('/', salonController.addSalon);

// Ruta za dohvatanje javnih detalja salona (dostupno svima)
// GET /api/salons/:id
router.get('/:id', salonController.getPublicSalonDetails);

// Ruta za dohvatanje SVIH salona povezanih sa autentifikovanim vlasnikom
// GET /api/salons/me
// router.get('/me', authMiddleware.ownerAuth, salonController.getOwnerSalonDetails);
router.get('/me', salonController.getOwnerSalonDetails); // Privremeno bez auth

// Ruta za ažuriranje detalja salona za vlasnika
// OPREZ: Kao što je navedeno u kontroleru, ova ruta pretpostavlja da vlasnik ima jedan salon
// ili da uvek ažurira prvi salon. Bolja praksa bi bila koristiti /api/owners/me/salons/:salonId za ažuriranje.
// PUT /api/salons/me
// router.put('/me', authMiddleware.ownerAuth, salonController.updateSalonDetails);
router.put('/me', salonController.updateSalonDetails); // Privremeno bez auth

// Ruta za upload logotipa salona
// POST /api/salons/me/logo
// 'logo' je naziv polja u FormData
// router.post('/me/logo', authMiddleware.ownerAuth, salonController.uploadSalonLogo);
router.post('/me/logo', salonController.uploadSalonLogo); // Privremeno bez auth

module.exports = router;