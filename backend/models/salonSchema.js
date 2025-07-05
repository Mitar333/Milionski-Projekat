const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salonSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // unique: true // OPREZ: Da li je naziv salona jedinstven u CELOJ aplikaciji ili samo u okviru vlasnika?
                     // Ako je samo kod vlasnika, onda je ovo ok. Ako mislis da ce biti salon "Beauty Spot" u jednom gradu i u drugom,
                     // onda unique: true ovdje sprecava to. Razmisli o tome. Za MVP je obicno OK.
        minlength: 3, // DODATO: Minimalna duzina
        maxLength: 100 // DODATO: Maksimalna duzina
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200 // DODATO: Ogranicenje duzine
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        // unique: true, // OPREZ: Slicno kao kod vlasnika, da li je telefon salona globalno unique?
                       // Vjerovatnije da ce biti jedinstven unutar grada ili vlasnika, ali ne nuzno globalno.
        match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please fill a valid phone number']
    },
    email: {
        type: String,
        required: true,
        // unique: true, // OPREZ: Isto kao telefon. Vjerovatno ok ako je jedinstven u okviru vlasnika.
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    logoUrl: {
        type: String,
        trim: true,
        default: null,
        maxLength: 2000 // DODATO: Ogranicenje duzine za URL
    },
    workingHours: {
        type: Map,
        of: String, // Stringovi poput "09:00-17:00"
        default: {}
    },
    description: {
        type: String,
        trim: true,
        default: '',
        maxLength: 500 // DODATO: Ogranicenje duzine
    }
}, { timestamps: true }); // PREPORUKA: Koristi ovo!

// salonSchema.pre('save', function(next) {
//   this.updatedAt = Date.now(); // OVO UKLONITI ako koristite timestamps: true
//   next();
// });

module.exports = mongoose.model('Salon', salonSchema);