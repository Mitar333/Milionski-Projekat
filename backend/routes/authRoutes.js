// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, authorizeRole, authorizeSalonAccess } = require('../utils/authMiddleware');

router.post('/register/owner', authController.registerOwner);
router.post('/login/owner', authController.loginOwner);
router.post('/login/user', authController.loginUser);
router.post('/login/employee', authController.loginEmployee);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword); 

router.get('/me', verifyToken, authController.getAuthenticatedUser);

router.post('/salons/:salonId/register/user', authController.registerUser);

router.post(
  '/salons/:salonId/register/employee',
  verifyToken,
  authorizeRole('owner'),
  authorizeSalonAccess,
  authController.registerEmployee
);

module.exports = router;
