// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const AppError=require("./utils/errorHandler").AppError
=======
const path = require('path');
//const User = require('./models/userSchema');
//const userRoutes = require('./routes/userRoutes');


//const ApointmentRoutes = require('./routes/ApointmentRoutes');
//const Apointment = require('./models/Apointment');
>>>>>>> f56f5c7d (.)

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Definisanje ruta
//app.use("/api/users", userRoutes);
// app.use("/api/appointments", ApointmentRoutes);



// Detektuje ako si ukucao pogresan url
app.all("*",(req,res,next)=>{
  next(new AppError(`Ruta ${req.originalUrl} nije pronađena`,404))
})

app.use((err,req,res,next)=>{
  err.statusCode= err.statusCode || 500;
  err.status=err.status||"error";
  res.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })
})

// app.use()
app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/salons', salonRoutes);


// Povezivanje sa MongoDB
mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log('MongoDB konektovan'))
.catch(err => console.error('Greška pri konekciji:', err));

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
