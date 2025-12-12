const Salon = require('../models/salonSchema');
const Owner = require('../models/ownerSchema');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const catchAsync=require("./../utils/errorHandler").catchAsync
const AppError=require("./../utils/errorHandler").AppError
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
const convertWorkingHoursToDate=(wh,next)=>{
//ocekujem da postoji wh.monday...
if(!wh || !wh.monday || !wh.tuesday || !wh.wednesday || !wh.thursday|| !wh.friday || !wh.saturday || !wh.sunday){return next(AppError("Neispravan format wh",400))}
if(!wh.monday.startTime){return next(AppError("Neispravan format wh2",400))}
//format wh valja
let new_wh={
  monday:{},
  tuesday:{},
  wednesday:{},
  thursday:{},
  friday:{},
  saturday:{},
  sunday:{},
}

Object.keys(new_wh).forEach(day=>{
  if(wh[day].isOpen){//za dane kada salon radi
  
  let [startH,startM]=wh[day].startTime.split(":").map(Number)
  let [endH,endM]=wh[day].endTime.split(":").map(Number)
  new_wh[day].startTime=new Date(Date.UTC(2000,0,1,startH,startM,0,0))
  new_wh[day].endTime=new Date(Date.UTC(2000,0,1,endH,endM,0,0))
  new_wh[day].isOpen=true}else{
  //za dane kada salon ne radi
  new_wh[day].startTime=null
  new_wh[day].endTime=null
  new_wh[day].isOpen=false}
  return new_wh
});
}

// za pravljenje novog salona
//////////////////////// TREBA ZASTITITI JER OVO BI TREBALO DA BUDE DOSTUPNO SAMO OWNERU SALONA ILI ADMINU ////////////////////////
exports.addSalon =catchAsync( async (req, res,next) => {
  
    const { name, address, phone, email, workingHours, description } = req.body;

    let existingSalon = await Salon.findOne({ $or: [{ name }, { email }] });
    if (existingSalon) {
      
      return next(new AppError( 'Salon sa ovim imenom ili emailom vec postoji.',400))
    }
    let newWH=convertWorkingHoursToDate(workingHours,next)//u bazu ne idu stringovi ali sa frontenda dolaze
    const newSalon = new Salon({
      name,
      address,
      phone,
      email,
      workingHours:newWH,
      description
    });

    const salon = await newSalon.save();
    res.status(201).json(salon);
  
});

// uzima javne detalje salona
exports.getPublicSalonDetails =catchAsync( async (req, res,next) => {
  
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    
      return next(new AppError( 'Invalidan Salon ID.',400))
    }

    const salon = await Salon.findById(id);

    if (!salon) {
     
      return next(new AppError( 'Salon nije pronadjen.',404))
    }

    res.status(200).json(salon);
  
});

// uzima detalje salona za autentifikovanog ownera.
// onwer može imati vise salona, pa vracamo listu salona koje ima.
exports.getOwnerSalonDetails =catchAsync( async (req, res,next) => {
  
    const ownerId = req.user.id;

    const owner = await Owner.findById(ownerId).populate('salonIds');
    if (!owner) {
      return next(new AppError( 'Owner nije pronadjen.',404))
      
    }

    if (!owner.salonIds || owner.salonIds.length === 0) {
      
      return next(new AppError( 'Owner nema povezanih salona.' ,404))
    }

    res.status(200).json(owner.salonIds);
  
});

// updateuje detalje salona za Ownera.
exports.updateSalonDetails =catchAsync( async (req, res,next) => {
  
    const ownerId = req.user.id;
    const updateData = req.body;

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return next(new AppError( 'Owner nije pronadjen.',404))
      
    }

    const salonIdToUpdate = owner.salonIds[0]; // Nije bas dobro ako owner ima vise salona, ali ajd za sad cemo ovako
                                            
    if (!salonIdToUpdate || !mongoose.Types.ObjectId.isValid(salonIdToUpdate)) {
      return next(new AppError( 'Nema povezanog salona za updateovanje ili ID je nevalidan.',400))
        
    }
    if(updateData.workingHours){updateData.workingHours=convertWorkingHoursToDate(updateData.workingHours,next)}//u bazu ne idu stringovi ali sa frontenda dolaze

    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedSalon = await Salon.findByIdAndUpdate(salonIdToUpdate, updateData, { new: true, runValidators: true });

    if (!updatedSalon) {
      return next(new AppError( 'Salon nije pronadjen za updateovanje.',404))
      
    }

    res.status(200).json({ message: 'Salon uspesno updateovan.', salon: updatedSalon });
  
});

// Uploaduje i updateuje logo salona.
exports.uploadSalonLogo = [
  upload.single('logo'),
 catchAsync( async (req, res,next) => {
    
      if (!req.file) {
        return next(new AppError( 'Nijedan fajl nije poslat.',400))
 
      }

      const ownerId = req.user.id;
      const owner = await Owner.findById(ownerId);

      if (!owner) {
        fs.unlinkSync(req.file.path);
        return next(new AppError( 'Owner nije pronadjen.',404))
     
      }

      const salonIdToUpdate = owner.salonIds[0]; // Nije bas dobro ako owner ima vise salona, ali ajd za sad ce mo ovako
                                                
      if (!salonIdToUpdate || !mongoose.Types.ObjectId.isValid(salonIdToUpdate)) {
        fs.unlinkSync(req.file.path);
        return next(new AppError( 'Nema povezanog salona za updateovanje ili ID je nevalidan.',400))
        
      }

      const salon = await Salon.findById(salonIdToUpdate);

      if (!salon) {
        fs.unlinkSync(req.file.path);
        
        return next(new AppError( 'Salon nije pronadjen.',404))
        
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
    
  })
];