const Owner = require('../models/ownerSchema');
const User = require('../models/userSchema');
const Employee = require('../models/employeeSchema');
const Salon = require('../models/salonSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.MAILTRAP_PORT || 2525, // e.g., 2525
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS, 
  },
});


const generateToken = (id, role, salonId = null) => {
  const payload = { id, role };
  if (salonId) {
    payload.salonId = salonId;
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.registerOwner = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, salonName, salonAddress, salonPhone, salonEmail, salonWorkingHours, salonDescription } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || password.length < 6) {
      return res.status(400).json({ message: 'Molimo unesite sva obavezna polja za vlasnika i lozinka mora imati najmanje 6 karaktera.' });
    }

    if (!salonName || !salonAddress || !salonPhone || !salonEmail) {
      return res.status(400).json({ message: 'Molimo unesite sva obavezna polja za salon.' });
    }

    let existingOwner = await Owner.findOne({ $or: [{ email }, { phone }] });
    if (existingOwner) {
      return res.status(400).json({ message: 'Vlasnik sa ovim emailom ili telefonom vec postoji.' });
    }

    let existingSalon = await Salon.findOne({ $or: [{ name: salonName }, { email: salonEmail }] });
    if (existingSalon) {
      return res.status(400).json({ message: 'Salon sa ovim imenom ili emailom vec postoji.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSalon = new Salon({
      name: salonName,
      address: salonAddress,
      phone: salonPhone,
      email: salonEmail,
      workingHours: salonWorkingHours || {},
      description: salonDescription || ''
    });
    const salon = await newSalon.save();

    const newOwner = new Owner({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      salonIds: [salon._id],
      role: 'owner'
    });
    const owner = await newOwner.save();

    const token = generateToken(owner._id, owner.role, salon._id);

    const ownerResponse = owner.toObject();
    delete ownerResponse.password;

    res.status(201).json({
      message: 'Vlasnik i salon uspesno registrovani!',
      token,
      owner: ownerResponse,
      salon: salon.toObject(),
    });

  } catch (error) {
    console.error('Greska pri registraciji vlasnika i salona:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Molimo unesite email i lozinku.' });
    }

    const owner = await Owner.findOne({ email }).select('+password');
    if (!owner) {
      return res.status(400).json({ message: 'Nevazeci kredencijali.' });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Nevazeci kredencijali.' });
    }

    const token = generateToken(owner._id, owner.role, owner.salonIds[0]);
    const ownerResponse = owner.toObject();
    delete ownerResponse.password;

    res.status(200).json({
      message: 'Uspesna prijava vlasnika!',
      token,
      owner: ownerResponse,
    });
  } catch (error) {
    console.error('Greska pri prijavi vlasnika:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { salonId } = req.params;
    const { firstName, lastName, email, password, phone, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(salonId)) {
      return res.status(400).json({ message: 'Nevazeci ID salona.' });
    }

    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: 'Salon nije pronađen.' });
    }

    if (!firstName || !lastName || !email || !password || password.length < 6) {
      return res.status(400).json({ message: 'Molimo unesite sva obavezna polja za usera i lozinka mora imati najmanje 6 karaktera.' });
    }

    let existingUser = await User.findOne({ email, salonId });
    if (existingUser) {
      return res.status(400).json({ message: 'Korisnik sa ovim emailom vec postoji u ovom salonu.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      salonId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone: phone || '',
      notes: notes || ''
    });

    const user = await newUser.save();
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'Korisnik uspesno registrovan za salon.',
      user: userResponse,
    });
  } catch (error) {
    console.error('Greska pri registraciji usera:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Molimo unesite email i lozinku.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Nevazeci kredencijali.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Nevazeci kredencijali.' });
    }

    const token = generateToken(user._id, 'user', user.salonId);
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: 'Uspesna prijava usera!',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Greska pri prijavi usera:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

exports.registerEmployee = async (req, res) => {
  try {
    const { salonId } = req.params;
    const { name, bio, phone, email, password, servicesOffered, schedule } = req.body;

    if (!mongoose.Types.ObjectId.isValid(salonId)) {
      return res.status(400).json({ message: 'Nevazeci ID salona.' });
    }

    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: 'Salon nije pronađen.' });
    }

    if (!name || !phone || !email || !password || password.length < 6) {
      return res.status(400).json({ message: 'Molimo unesite sva obavezna polja za zaposlenog i lozinka mora imati najmanje 6 karaktera.' });
    }

    let existingEmployee = await Employee.findOne({ $or: [{ email }, { phone }], salonId });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Zaposleni sa ovim emailom ili telefonom vec postoji u ovom salonu.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      salonId,
      name,
      bio: bio || '',
      phone,
      email,
      password: hashedPassword,
      servicesOffered: servicesOffered || [],
      schedule: schedule || {},
    });

    const employee = await newEmployee.save();
    const employeeResponse = employee.toObject();
    delete employeeResponse.password;

    res.status(201).json({
      message: 'Zaposleni uspesno registrovan za salon.',
      employee: employeeResponse,
    });
  } catch (error) {
    console.error('Greska pri registraciji zaposlenog:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Molimo unesite email i lozinku.' });
    }

    const employee = await Employee.findOne({ email }).select('+password');
    if (!employee) {
      return res.status(400).json({ message: 'Nevazeci kredencijali.' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Nevazeci kredencijali.' });
    }

    const token = generateToken(employee._id, 'employee', employee.salonId);
    const employeeResponse = employee.toObject();
    delete employeeResponse.password;

    res.status(200).json({
      message: 'Uspesna prijava zaposlenog!',
      token,
      employee: employeeResponse,
    });
  } catch (error) {
    console.error('Greska pri prijavi zaposlenog:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

exports.getAuthenticatedUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id || !req.user.role) {
      return res.status(401).json({ message: 'Nije autorizovano, nema tokena ili korisnik nije pronađen.' });
    }

    let user;
    switch (req.user.role) {
      case 'owner':
        user = await Owner.findById(req.user.id).select('-password');
        break;
      case 'user':
        user = await User.findById(req.user.id).select('-password');
        break;
      case 'employee':
        user = await Employee.findById(req.user.id).select('-password');
        break;
      case 'admin':
        // user = await Admin.findById(req.user.id).select('-password');
        return res.status(403).json({ message: 'Admin uloge jos nisu implementirane.' });
      default:
        return res.status(400).json({ message: 'Nepoznata korisnička uloga.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Greska pri dohvatanju autentifikovanog usera:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Molimo unesite email adresu.' });
    }

    let foundUser;
    let userType;

    foundUser = await Owner.findOne({ email });
    if (foundUser) userType = 'owner';

    if (!foundUser) {
      foundUser = await User.findOne({ email });
      if (foundUser) userType = 'user';
    }

    if (!foundUser) {
      foundUser = await Employee.findOne({ email });
      if (foundUser) userType = 'employee';
    }

    if (!foundUser) {
      return res.status(200).json({ message: 'Ako je email adresa registrovana, uputstva za resetovanje lozinke su poslana na tu adresu.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    foundUser.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    foundUser.passwordResetExpires = Date.now() + 3600000;

    await foundUser.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Salon App'}" <${process.env.EMAIL_FROM_ADDRESS || 'noreply@salonapp.com'}>`,
      to: foundUser.email,
      subject: 'Resetovanje lozinke za Salon App',
      html: `
        <p>Primili ste ovaj email jer ste (ili neko drugi) zatrazili resetovanje lozinke za vas nalog.</p>
        <p>Molimo kliknite na sledeci link, ili ga kopirajte i zalepite u vas pretrazivač da biste dovrsili proces:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>Link ce isteci za 1 sat.</p>
        <p>Ako niste zatrazili ovo, molimo Vas da zanemarite ovaj email i Vasa lozinka ce ostati nepromenjena.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Uputstva za resetovanje lozinke su poslana na Vas email.' });

  } catch (error) {
    if (foundUser) {
      foundUser.passwordResetToken = undefined;
      foundUser.passwordResetExpires = undefined;
      await foundUser.save({ validateBeforeSave: false });
    }
    console.error('Greska pri zaboravljenoj lozinci:', error);
    res.status(500).json({ message: 'Doslo je do greske prilikom slanja emaila za resetovanje lozinke.' });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Nova lozinka je obavezna i mora imati najmanje 6 karaktera.' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    let foundUser;

    foundUser = await Owner.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!foundUser) {
      foundUser = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });
    }

    if (!foundUser) {
      foundUser = await Employee.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });
    }

    if (!foundUser) {
      return res.status(400).json({ message: 'Token za resetovanje lozinke je nevazeci ili je istekao.' });
    }

    // Hash the new password
    foundUser.password = await bcrypt.hash(newPassword, 10);
    foundUser.passwordResetToken = undefined;
    foundUser.passwordResetExpires = undefined;

    await foundUser.save();

    res.status(200).json({ message: 'Lozinka je uspesno resetovana.' });

  } catch (error) {
    console.error('Greska pri resetovanju lozinke:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};