const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorizeRole, authorizeSalonAccess } = require('../utils/authMiddleware');

router.get(
  '/salons/:salonId/users', // Putanja je `/api/users/salons/:salonId/users`
  verifyToken,
  authorizeRole('owner', 'employee'),
  authorizeSalonAccess,
  userController.getUsersBySalon
);

router.get(
  '/:id', // Putanja je `/api/users/:id`
  verifyToken,
  authorizeRole('owner', 'employee', 'user'),
  async (req, res, next) => {
    if (req.user.role === 'user' && req.user.id === req.params.id) {
      return next();
    }
    next();
  },
  authorizeSalonAccess,
  userController.getUserDetails
);

router.patch(
  '/:id',
  verifyToken,
  authorizeRole('owner', 'employee', 'user'),
  async (req, res, next) => {
    if (req.user.role === 'user' && req.user.id === req.params.id) {
      return next();
    }
    next();
  },
  authorizeSalonAccess,
  userController.updateUser
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRole('owner'),
  authorizeSalonAccess,
  userController.deleteUser
);

module.exports = router;
