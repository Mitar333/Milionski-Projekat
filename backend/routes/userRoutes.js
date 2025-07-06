const express = require('express');
const router = express.Router(); // Ova linija je ključna
const userController = require('../controllers/userController'); // Prilagodi putanju ako je potrebno

// NAPOMENA: Ako ćeš imati autentifikaciju (što je preporučeno za mnoge od ovih ruta),
// moraćeš da dodaš middleware za autentifikaciju ovde.
// const authMiddleware = require('../middleware/authMiddleware'); // Primer auth middleware-a

// Ruta za kreiranje novog korisnika (registracija)
// POST /api/users
router.post('/', userController.createUser);

// Ruta za dohvatanje svih korisnika za određeni salon
// GET /api/salons/:salonId/users
// Ova ruta je specifična jer počinje sa '/salons' umesto '/users',
// pa će u app.js morati biti tretirana drugačije ili prebačena u salon rute.
// Ipak, za sada je stavljamo ovde, ali imaj to na umu.
// Ako se koristi authMiddleware, ovde bi se verovatno proveravalo da li vlasnik ima dozvolu za pristup korisnicima datog salona.
// router.get('/salons/:salonId/users', authMiddleware.ownerAuth, userController.getUsersBySalon);
router.get('/salons/:salonId/users', userController.getUsersBySalon); // Privremeno bez auth

// Ruta za dohvatanje detalja specifičnog korisnika po ID-u
// GET /api/users/:id
// Ovu rutu bi verovatno trebalo zaštititi da korisnik može videti samo svoje detalje
// ili vlasnik salona može videti detalje svojih korisnika.
// router.get('/:id', authMiddleware.userOrOwnerAuth, userController.getUserDetails);
router.get('/:id', userController.getUserDetails); // Privremeno bez auth

// Ruta za ažuriranje podataka postojećeg korisnika po ID-u
// PUT /api/users/:id
// Slično kao i get, ova ruta bi trebala biti zaštićena.
// router.put('/:id', authMiddleware.userOrOwnerAuth, userController.updateUser);
router.put('/:id', userController.updateUser); // Privremeno bez auth

module.exports = router;