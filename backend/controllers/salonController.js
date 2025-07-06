const Salon = require('../models/salonSchema');
const Owner = require('../models/ownerSchema');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// za pravljenje 'uploads' foldera ako ne postoji
const uploadDir = path.join(__dirname, '..', 'uploads', 'logos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Samo image fajlovi (JPEG, PNG, GIF) su dozvoljeni!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});


// za pravljenje novog salona
//////////////////////// TREBA ZASTITITI JER OVO BI TREBALO DA BUDE DOSTUPNO SAMO OWNERU SALONA ILI ADMINU ////////////////////////
exports.addSalon = async (req, res) => {
  try {
    const { name, address, phone, email, workingHours, description } = req.body;

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
    res.status(201).json(salon);
  } catch (error) {
    console.error('Greska pri dodavanju salona:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: `Salon sa ${Object.keys(error.keyValue)[0]} '${Object.values(error.keyValue)[0]}' vec postoji.` });
    }
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// uzima javne detalje salona
exports.getPublicSalonDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalidan Salon ID.' });
    }

    const salon = await Salon.findById(id);

    if (!salon) {
      return res.status(404).json({ message: 'Salon nije pronadjen.' });
    }

    res.status(200).json(salon);
  } catch (error) {
    console.error('Greska pri uzimanju javnih detalja salona:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// uzima detalje salona za autentifikovanog ownera.
// onwer može imati vise salona, pa vracamo listu salona koje ima.
exports.getOwnerSalonDetails = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const owner = await Owner.findById(ownerId).populate('salonIds');
    if (!owner) {
      return res.status(404).json({ message: 'Owner nije pronadjen.' });
    }

    if (!owner.salonIds || owner.salonIds.length === 0) {
      return res.status(404).json({ message: 'Owner nema povezanih salona.' });
    }

    res.status(200).json(owner.salonIds);
  } catch (error) {
    console.error('Greska pri uzimanju detalja salona za ownera:', error);
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// updateuje detalje salona za Ownera.
exports.updateSalonDetails = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const updateData = req.body;

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner nije pronadjen.' });
    }

    const salonIdToUpdate = owner.salonIds[0]; // Nije bas dobro ako owner ima vise salona, ali ajd za sad ce mo ovako
                                            
    if (!salonIdToUpdate || !mongoose.Types.ObjectId.isValid(salonIdToUpdate)) {
        return res.status(400).json({ message: 'Nema povezanog salona za updateovanje ili ID je nevalidan.' });
    }

    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedSalon = await Salon.findByIdAndUpdate(salonIdToUpdate, updateData, { new: true, runValidators: true });

    if (!updatedSalon) {
      return res.status(404).json({ message: 'Salon nije pronadjen za updateovanje.' });
    }

    res.status(200).json({ message: 'Salon uspesno updateovan.', salon: updatedSalon });
  } catch (error) {
    console.error('Greska pri updateovanju detalja salona:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: `Salon sa ${Object.keys(error.keyValue)[0]} '${Object.values(error.keyValue)[0]}' vec postoji.` });
    }
    res.status(500).json({ message: 'Server greska.', error: error.message });
  }
};

// Uploaduje i updateuje logo salona.
exports.uploadSalonLogo = [
  upload.single('logo'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Nijedan fajl nije poslat.' });
      }

      const ownerId = req.user.id;
      const owner = await Owner.findById(ownerId);

      if (!owner) {
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: 'Owner nije pronadjen.' });
      }

      const salonIdToUpdate = owner.salonIds[0]; // Nije bas dobro ako owner ima vise salona, ali ajd za sad ce mo ovako
                                                
      if (!salonIdToUpdate || !mongoose.Types.ObjectId.isValid(salonIdToUpdate)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Nema povezanog salona za upload loga ili ID je invalidan.' });
      }

      const salon = await Salon.findById(salonIdToUpdate);

      if (!salon) {
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: 'Salon nije pronadjen.' });
      }

      if (salon.logoUrl) {
        const oldLogoPath = path.join(uploadDir, path.basename(salon.logoUrl));
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }

      salon.logoUrl = `/uploads/logos/${req.file.filename}`;
      await salon.save();

      res.status(200).json({ message: 'Logo uspesno uploadovan i updateovan!', logoUrl: salon.logoUrl });
    } catch (error) {
      console.error('Greska pri uploadu loga salona:', error);
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ message: 'Server greska pri uploadu loga.', error: error.message });
    }
  }
];