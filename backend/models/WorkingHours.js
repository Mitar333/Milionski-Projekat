const mongoose = require("mongoose");

// 1. DEFAULT SEDMICA
const WeeklyDefaultSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, required: true, unique: true },
  label: { type: String },
  isWorkingDay: { type: Boolean, default: true },
  startTime: { type: String, default: "09:00" },
  endTime: { type: String, default: "17:00" },
});

// 2. SPECIFICNI DATUMI
//fali sekcija za radnika o kojem se prica
//date si svatio da je unique, sta ako salon ima 2 radnika 1 prva drugi druga smjena
//day month year ne vidim potrebu, vec su u date-u
//startTime i endTime mislim da je dovoljno i bez Time znaci samo start i end
//isWorkingDay je nepotrebno jer ce ovo se koristiti u slucajevima kada je radni dan a npr slava je radniku ili je uzeo slobodan dan
//konvencija za nazivanje fajlova u Express-u je da pocinju sa malim slovom a u React-u da fajlovi komponenti krecu sa velikim slovima i svakako fajl se ne naziva
//WorkingHours vec bi bilo workingHoursModel.js
//u controlleru nisi pisao nimalo if-ove ako je nesto poslo po zlu
const DailyOverrideSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  day: { type: Number },
  month: { type: Number },
  year: { type: Number },
  isWorkingDay: { type: Boolean, default: true },
  startTime: { type: String },
  endTime: { type: String },
  note: { type: String },
});

const WeeklyDefault = mongoose.model("WeeklyDefault", WeeklyDefaultSchema);
const DailyOverride = mongoose.model("DailyOverride", DailyOverrideSchema);

module.exports = { WeeklyDefault, DailyOverride };
