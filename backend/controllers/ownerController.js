const Owner = require('../models/ownerSchema');
const Salon = require('../models/salonSchema');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

////////////////////////////////////// sve 'me' rute zahtevaju autentifikaciju ownera.
// Owner pravi dodatni salon i povezuje ga sa svojim profilom.
exports.createAdditionalSalon = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { name, address, phone, email, workingHours, description } = req.body;

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner nije pronadjen.' });
    }

    let existingSalon = await Salon.findOne({ $or: [{ name }, { email }] });
    if (existingSalon) {
      return res.status(400).json({ message: 'Salon sa ovim imenom ili emailom vec postoji.' });
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
  } catch (error) {
    console.error('Greska pri kreiranju dodatnog salona:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: `Salon sa ${Object.keys(error.keyValue)[0]} '${Object.values(error.keyValue)[0]}' vec postoji.` });
    }
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// Owner updateuje detalje specificnog salona koji ima.
exports.updateAdditionalSalon = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { salonId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(salonId)) {
        return res.status(400).json({ message: 'Invalidan Salon ID.' });
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner nije pronadjen.' });
    }

    if (!owner.salonIds.some(id => id.toString() === salonId)) {
      return res.status(403).json({ message: 'Nemate dozvolu za updateovanje ovog salona.' });
    }

    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedSalon = await Salon.findByIdAndUpdate(salonId, updateData, { new: true, runValidators: true });

    if (!updatedSalon) {
      return res.status(404).json({ message: 'Salon nije pronadjen za updateovanje.' });
    }

    res.status(200).json({ message: 'Salon uspesno updateovan.', salon: updatedSalon });
  } catch (error) {
    console.error('Greska pri updateovanju dodatnog salona:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: `Salon sa ${Object.keys(error.keyValue)[0]} '${Object.values(error.keyValue)[0]}' vec postoji.` });
    }
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};


// Updateuje podatke profila ownera (firstName, lastName, email, phone)
exports.updateOwnerProfile = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const updateData = req.body;

    delete updateData.password;
    delete updateData.role;
    delete updateData.salonIds;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedOwner = await Owner.findByIdAndUpdate(ownerId, updateData, { new: true, runValidators: true }).select('-password');

    if (!updatedOwner) {
      return res.status(404).json({ message: 'Owner nije pronadjen za updateovanje profila.' });
    }

    res.status(200).json({ message: 'Profil ownera uspesno updateovan.', owner: updatedOwner });
  } catch (error) {
    console.error('Greska pri updateovanju profila ownera:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: `Owner sa ${Object.keys(error.keyValue)[0]} '${Object.values(error.keyValue)[0]}' vec postoji.` });
    }
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// Dozvola owneru da promeni svoju lozinku.
exports.changeOwnersPassword = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Stara i nova lozinka su obavezne.' });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Nova lozinka mora imati najmanje 6 karaktera.' });
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner nije pronadjen.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, owner.password);//owner.password je undefined
    if (!isMatch) {
      return res.status(401).json({ message: 'Stara lozinka nije ispravna.' });
    }

    owner.password = await bcrypt.hash(newPassword, 10);
    await owner.save();

    res.status(200).json({ message: 'Lozinka uspesno promenjena.' });
  } catch (error) {
    console.error('Greska pri promeni lozinke ownera:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};