// backend/server.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');

//const ApointmentRoutes = require('./routes/ApointmentRoutes');
//const Apointment = require('./models/Apointment');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
// app.use("/api/appointments", ApointmentRoutes);

// Povezivanje sa MongoDB
mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log('MongoDB konektovan'))
.catch(err => console.error('Greška pri konekciji:', err));

//povezivanje sa rutama
// app.use("/api",userRoutes)
// app.use("/api",ApointmentRoutes)

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
