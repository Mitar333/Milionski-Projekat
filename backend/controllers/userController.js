///////////////////// MOJ NOVI KOD ZA USER CONTROLLER /////////////////////

const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const catchAsync=require("./../utils/errorHandler").catchAsync
const AppError=require("./../utils/errorHandler").AppError

// registracija (ova ruta je sada u authController.js za registraciju novih korisnika za salon)
exports.createUser = catchAsync(async (req, res,next) => {
  
    const { salonId, firstName, lastName, email, password, phone, notes } = req.body;
    
    let existingUser = await User.findOne({ email, salonId });
    if (existingUser) {
      return next(new AppError('User sa ovim emailom vec postoji u ovom salonu.',400))
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      salonId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      notes
    });

    const user = await newUser.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
 
})

// gledanje usera iz odredjenog salona
exports.getUsersBySalon = catchAsync(async (req, res,next) => {
  
    const { salonId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(salonId)) {
        return next(new AppError('Invalidan Salon ID.',400))
    }

    const users = await User.find({ salonId }).select('-password');

    if (!users || users.length === 0) {
      // Nije greška ako nema korisnika, samo vraćamo prazan niz ili odgovarajuću poruku
      return res.status(200).json([]); // Vraća prazan niz umesto 404 ako nema usera
      // return next(new AppError('Nema pronadjenih usera za ovaj salon.',404)) // za 404
    }

    res.status(200).json(users);
 
})

// gledanje odredjenog usera po id
exports.getUserDetails = catchAsync(async (req, res,next) => {
  
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan user ID.',400))
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return next(new AppError('User nije pronadjen.',404))
    }

    res.status(200).json(user);
 
});

// update podataka usera
exports.updateUser = catchAsync(async (req, res,next) => {
  
    const { id } = req.params;
    const updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan user ID.',400))
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {
      return next(new AppError('User nije pronadjen.',404))
    }

    res.status(200).json(updatedUser);
  
});

// brisanje usera
exports.deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan user ID.',400))
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return next(new AppError('User nije pronadjen.',404))
    }
    
    res.status(204).json({
        status: 'success',
        data: null
    });
});
