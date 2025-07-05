///////////////////// MOJ NOVI KOD ZA USER CONTROLLER /////////////////////

const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// registracija
exports.createUser = async (req, res) => {
  try {
    const { salonId, firstName, lastName, email, password, phone, notes } = req.body;
    
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User sa ovim emailom vec postoji.' });
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
  } catch (error) {
    console.error('Greska pri pravljenju usera:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// gledanje usera iz odredjenog salona
exports.getUsersBySalon = async (req, res) => {
  try {
    const { salonId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(salonId)) {
        return res.status(400).json({ message: 'Invalidan Salon ID.' });
    }

    const users = await User.find({ salonId }).select('-password');

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Nema pronadjenih usera za ovaj salon.' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Greska pri pozivanju usera za salon:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// gledanje odredjenog usera po id
exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalidan user ID.' });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User nije pronadjen.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Greska pri pozivanju detalja usera:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// update podataka usera
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalidan user ID.' });
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User nije pronadjen za update.' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Greska pri update usera:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'User sa ovim emailom ili telefonom vec postoji.', field: Object.keys(error.keyValue)[0] });
    }
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};




/////////////////////////////////////////////////////// STARI KOD ZA USER CONTROLLER ///////////////////////////////////////////////////////
// const User = require('../models/userSchema');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const validator= require('validator');
// const { default: isEmail } = require('validator/lib/isEmail');
// // Function to register a new user
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users', error });
//     }
// }
// exports.getUserById = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user', error });
//     }
// }
// exports.postUser = async (req, res) => {
//     const { fullName, email, password } = req.body;
//     if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
//         return res.status(400).json({ message: 'Name is required' });
//     }
//     if (!email || isEmail(email) === false) {
//         return res.status(400).json({ message: 'Email is required' });}
//     if (!password || typeof password !== 'string' || password.length < 6) {
//         return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//     }
//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // Create a new user
//         const newUser = new User({
//             fullName,
//             email,
//             passwordHash: hashedPassword
//         });
//         // Save the user to the database
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {   
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// }
// exports.updateUserName = async (req, res) => {
//     const userId = req.params.id;
//     const { name} = req.body;
//     if (!name || typeof name !== 'string' || name.trim() === '') {
//         return res.status(400).json({ message: 'Name is required' });
//     }
//     try {
//         // Find the user by ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         // Update user details
//         user.fullName = name || user.fullName;
//         await user.save();
//         res.status(200).json({ message: 'User updated successfully', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user', error });
//     }
// }
// exports.updateUserEmail = async (req, res) => {
//     const userId = req.params.id;
//     const {  email } = req.body;
//     if (!email || isEmail(email) === false) {
//         return res.status(400).json({ message: 'Email is required' });}
//     try {
//         // Find the user by ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         // Update user details
//         user.email = email || user.email;
//         await user.save();
//         res.status(200).json({ message: 'User updated successfully', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user', error });
//     }
// }
// exports.deleteUser = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         // Find the user by ID and delete
//         const user = await User.findByIdAndDelete(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }   
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user', error });
//     }
// }