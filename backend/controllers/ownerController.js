const Owner = require('../models/ownerSchema');
const Salon = require('../models/salonSchema');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const catchAsync=require("./../utils/errorHandler").catchAsync
const AppError=require("./../utils/errorHandler").AppError
////////////////////////////////////// sve 'me' rute zahtevaju autentifikaciju ownera.
// Owner pravi dodatni salon i povezuje ga sa svojim profilom.
exports.createAdditionalSalon =catchAsync( async (req, res,next) => {
  
    const ownerId = req.user.id;
    const { name, address, phone, email, workingHours, description } = req.body;

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return next(new AppError( 'Owner nije pronadjen.',404))
    }

    let existingSalon = await Salon.findOne({ $or: [{ name }, { email }] });
    if (existingSalon) {
      return next(new AppError( 'Salon sa ovim imenom ili emailom vec postoji.',400))
      
    }

    const newSalon = new Salon({
      name,
      address,
      phone,
      email,
      workingHours,
      description
    });

    const salon = await newSalon.save();

    owner.salonIds.push(salon._id);
    await owner.save();

    res.status(201).json({ message: 'Dodatni salon uspesno napravljen i povezan sa ownerom.', salon });
 
});

// Owner updateuje detalje specificnog salona koji ima.
exports.updateAdditionalSalon =catchAsync( async (req, res,next) => {
  
    const ownerId = req.user.id;
    const { salonId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(salonId)) {
      return next(new AppError( 'Invalidan Salon ID.',400))
        
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return next(new AppError( 'Owner nije pronadjen.',404))
      
    }

    if (!owner.salonIds.some(id => id.toString() === salonId)) {
      return next(new AppError( 'Nemate dozvolu za updateovanje ovog salona.',403))
    }

    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedSalon = await Salon.findByIdAndUpdate(salonId, updateData, { new: true, runValidators: true });

    if (!updatedSalon) {
      return next(new AppError( 'Salon nije pronadjen za updateovanje.',404))
    }

    res.status(200).json({ message: 'Salon uspesno updateovan.', salon: updatedSalon });
 
});


// Updateuje podatke profila ownera (firstName, lastName, email, phone)
exports.updateOwnerProfile =catchAsync( async (req, res,next) => {
  
    const ownerId = req.user.id;
    const updateData = req.body;

    delete updateData.password;
    delete updateData.role;
    delete updateData.salonIds;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedOwner = await Owner.findByIdAndUpdate(ownerId, updateData, { new: true, runValidators: true }).select('-password');

    if (!updatedOwner) {
      return next(new AppError( 'Owner nije pronadjen za updateovanje profila.',404))
    }

    res.status(200).json({ message: 'Profil ownera uspesno updateovan.', owner: updatedOwner });
  
});

// Dozvola owneru da promeni svoju lozinku.
exports.changeOwnersPassword =catchAsync( async (req, res,next) => {
  
    const ownerId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      
       return next(new AppError( 'Stara i nova lozinka su obavezne.',400))
    }
    if (newPassword.length < 6) {
       return next(new AppError( 'Nova lozinka mora imati najmanje 6 karaktera.',400))
        
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
       return next(new AppError( 'Owner nije pronadjen.',404))
      
    }

    const isMatch = await bcrypt.compare(oldPassword, owner.password);
    if (!isMatch) {
       return next(new AppError( 'Stara lozinka nije ispravna.',401))
    }

    owner.password = await bcrypt.hash(newPassword, 10);
    await owner.save();

    res.status(200).json({ message: 'Lozinka uspesno promenjena.' });
  
});