const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/frizerski', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/appointments', appointmentRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
