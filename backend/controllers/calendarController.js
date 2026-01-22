const { WeeklyDefault, DailyOverride } = require('../models/WorkingHours');

const daysOfWeek = {
  0: "Nedjelja",
  1: "Ponedjeljak",
  2: "Utorak",
  3: "Srijeda",
  4: "Četvrtak",
  5: "Petak",
  6: "Subota",
};

const initDefaults = async () => {
  const count = await WeeklyDefault.countDocuments();
  if (count === 0) {
    console.log("Inicijalizujem defaultno radno vrijeme...");
    const defaults = [];
    for (let i = 0; i <= 6; i++) {
      defaults.push({
        dayOfWeek: i,
        label: daysOfWeek[i],
        isWorkingDay: i !== 0 && i !== 6, 
        startTime: "09:00",
        endTime: "17:00"
      });
    }
    await WeeklyDefault.insertMany(defaults);
    console.log("Defaultno radno vrijeme kreirano.");
  }
};

// 1. GET: Geta podatke
// mjenjanje mjeseca
exports.getMonthData = async (req, res) => {
  try {
    await initDefaults();
    
    const { year, month } = req.query;
    
    const defaults = await WeeklyDefault.find();

    // samo izuzetci
    const overrides = await DailyOverride.find({
      year: parseInt(year),
      month: parseInt(month)
    });

    res.status(200).json({
      defaults,
      overrides
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. POST: Sacuvaj/Azuriraj radno vrijeme za ODREĐENI DAN
exports.saveDayOverride = async (req, res) => {
  const { day, month, year, startTime, endTime, isWorkingDay, note } = req.body;

  try {
    // Date objekat
    const dateObj = new Date(year, month, day); 

    const override = await DailyOverride.findOneAndUpdate(
      { year, month, day },
      { 
        date: dateObj,
        day, month, year,
        startTime, 
        endTime, 
        isWorkingDay,
        note
      },
      { new: true, upsert: true }
    );

    res.status(200).json(override);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. PUT: Updatanje DEFAULTNO radno vreme
exports.updateDefault = async (req, res) => {
  const { dayOfWeek, startTime, endTime, isWorkingDay } = req.body;
  
  try {
    const updated = await WeeklyDefault.findOneAndUpdate(
      { dayOfWeek },
      { startTime, endTime, isWorkingDay },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};