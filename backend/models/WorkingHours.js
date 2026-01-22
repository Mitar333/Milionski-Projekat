const mongoose = require('mongoose');

// 1. DEFAULT SEDMICA
const WeeklyDefaultSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, required: true, unique: true },
  label: { type: String },
  isWorkingDay: { type: Boolean, default: true },
  startTime: { type: String, default: "09:00" },
  endTime: { type: String, default: "17:00" }
});

// 2. SPECIFICNI DATUMI
const DailyOverrideSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  day: { type: Number },
  month: { type: Number },
  year: { type: Number },
  isWorkingDay: { type: Boolean, default: true },
  startTime: { type: String },
  endTime: { type: String },
  note: { type: String }
});

const WeeklyDefault = mongoose.model('WeeklyDefault', WeeklyDefaultSchema);
const DailyOverride = mongoose.model('DailyOverride', DailyOverrideSchema);

module.exports = { WeeklyDefault, DailyOverride };