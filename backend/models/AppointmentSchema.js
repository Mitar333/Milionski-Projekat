const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: String,
  date: Date
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
