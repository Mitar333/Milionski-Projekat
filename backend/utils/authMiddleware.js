const jwt = require('jsonwebtoken');
const Owner = require('../models/ownerSchema');
const User = require('../models/userSchema');
const Employee = require('../models/employeeSchema');
const mongoose = require('mongoose'); // Potrebno za proveru ObjectId-a

exports.verifyToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {

      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        id: decoded.id,
        role: decoded.role,
        salonId: decoded.salonId
      };

      next();
    } catch (error) {
      console.error('Greska pri verifikaciji tokena:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token je istekao, molimo prijavite se ponovo.' });
      }
      return res.status(401).json({ message: 'Nije autorizovano, token nije uspesan.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Nije autorizovano, nema tokena.' });
  }
};

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Nije autorizovano, korisnička uloga nije definisana.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Korisnik sa ulogom "${req.user.role}" nije ovlascen za pristup ovoj ruti.` });
    }
    next();
  };
};

exports.authorizeSalonAccess = async (req, res, next) => {
  const { salonId } = req.params;

  if (!req.user || !req.user.id || !req.user.role) {
    return res.status(401).json({ message: 'Nije autorizovano, korisnik nije prijavljen ili nedostaju podaci.' });
  }

  if (!mongoose.Types.ObjectId.isValid(salonId)) {
    return res.status(400).json({ message: 'Nevazeci ID salona.' });
  }

  try {
    let hasAccess = false;

    switch (req.user.role) {
      case 'owner':
        const owner = await Owner.findById(req.user.id);
        if (owner && owner.salonIds.includes(salonId)) {
          hasAccess = true;
        }
        break;
      case 'user':
        const user = await User.findById(req.user.id);
        if (user && user.salonId.toString() === salonId.toString()) {
          hasAccess = true;
        }
        break;
      case 'employee':
        const employee = await Employee.findById(req.user.id);
        if (employee && employee.salonId.toString() === salonId.toString()) {
          hasAccess = true;
        }
        break;
      default:
        hasAccess = false;
        break;
    }

    if (hasAccess) {
      next();
    } else {
      return res.status(403).json({ message: 'Nije ovlascen pristup ovom salonu.' });
    }
  } catch (error) {
    console.error('Greska pri proveri pristupa salonu:', error);
    res.status(500).json({ message: 'Server greska pri proveri pristupa salonu.' });
  }
};