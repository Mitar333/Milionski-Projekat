// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path'); // Uvezi 'path' modul

process.on("uncaughtException",err=>{
  console.log(err);
  console.log("Error!! Aplication Shutdown"); 
  process.exit(1)
})

// Uvezi rute
const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const salonRoutes = require('./routes/salonRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmenRoutes = require('./routes/appointmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const employeeRoutes = require('./routes/employeeRoutes'); 
// const ApointmentRoutes = require('./routes/ApointmentRoutes'); // Ostavi zakomentarisano ako se ne koristi

const AppError = require('./utils/errorHandler').AppError; // Proveri putanju ako ne postoji

const app = express();
const PORT = process.env.PORT || 5000; //

app.use(cors()); //
app.use(express.json()); //
app.use(express.urlencoded({ extended: true })); // Dodaj za multer

// Serviraj statičke fajlove iz 'uploads' foldera (za logotipe)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Definisanje i korišćenje ruta
// Važno: Auth rute treba da budu postavljene pre ostalih ruta koje zahtevaju autentifikaciju
app.use('/api/auth', authRoutes); // Postavi auth rute

app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/salons', salonRoutes);
app.use('/api/appointments', appointmenRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/employees', employeeRoutes);

// OPREZ: Ruta '/salons/:salonId/users' unutar userRoutes.js
// Kao što je ranije sugerisano, preporučljivo je premestiti `router.get('/salons/:salonId/users', userController.getUsersBySalon);`
// iz `userRoutes.js` u `salonRoutes.js` kako bi bila logički grupisana i imala ispravnu putanju `GET /api/salons/:salonId/users`.
// U tom slučaju, u `salonRoutes.js` bi izgledala kao `router.get('/:salonId/users', userController.getUsersBySalon);`

// Detektuje ako si ukucao pogresan url (ovo treba da bude POSLE svih tvojih definicija ruta)
app.all("*",(req,res,next)=>{
  next(new AppError(`Ruta ${req.originalUrl} nije pronađena`,404))
})

// Globalni error handling middleware (uvek na kraju)
app.use((err,req,res,next)=>{
  err.statusCode= err.statusCode || 500;
  err.status=err.status||"error";
  res.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })
})

// Povezivanje sa MongoDB
mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log('MongoDB konektovan'))
.catch(err => console.error('Greška pri konekciji:', err));

const server=app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`); //
});

process.on("unhandledRejection",err=>{
  console.log(err);
  console.log("Error! Aplication Shutdown"); 
  server.close(()=>{process.exit(1)})
});
