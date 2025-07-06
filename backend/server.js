// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path'); // Uvezi 'path' modul

// Uvezi rute
const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const salonRoutes = require('./routes/salonRoutes');
// const ApointmentRoutes = require('./routes/ApointmentRoutes'); // Ako ovo želiš koristiti, morao bi ga aktivirati

const AppError = require('./utils/errorHandler').AppError;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware za parsiranje JSON tela
app.use(express.urlencoded({ extended: true })); // Middleware za parsiranje URL-encoded (potrebno za Multer)

// Serviraj statičke fajlove iz 'uploads' foldera (za logotipe)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Definisanje i korišćenje ruta
app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/salons', salonRoutes);

// OPREZ: Ruta '/salons/:salonId/users' unutar userRoutes.js
// Ako želiš da ruta GET /api/salons/:salonId/users radi, a ona je definisana u userRoutes.js kao router.get('/salons/:salonId/users'),
// onda je to i dalje problematično jer će stvarna ruta biti /api/users/salons/:salonId/users.
// NAJBOLJE REŠENJE: Premesti router.get('/salons/:salonId/users', userController.getUsersBySalon);
// iz userRoutes.js u salonRoutes.js, i tamo neka bude samo router.get('/:salonId/users', ...);
// Onda bi se koristila kao app.use('/api/salons', salonRoutes); i putanja bi bila ispravna.


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

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});