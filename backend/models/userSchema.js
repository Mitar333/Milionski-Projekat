const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    salonId: {
        type: Schema.Types.ObjectId,
        ref: 'Salon',
        required: true,
        index: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2, // DODATO: Minimalna duzina
        maxLength: 50 // DODATO: Maksimalna duzina
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2, // DODATO: Minimalna duzina
        maxLength: 50 // DODATO: Maksimalna duzina
    },
    email: {
        type: String,
        required: true,
        // unique: true, // OPREZ: Globalno unique. Bolje je sa salonId.
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // DOBRO: Minimalna dužina lozinke
    },
    phone: {
        type: String,
        // required: true, // Razmisli da li je telefon obavezan za klijenta. Često jeste.
        trim: true,
        // unique: true, // OPREZ: Globalno unique. Bolje je sa salonId.
        match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please fill a valid phone number']
    },
    notes: {
        type: String,
        trim: true,
        default: '',
        maxLength: 500 // DODATO: Ogranicenje duzine
    }
}, { timestamps: true }); // PREPORUKA: Koristi ovo!

// PREPORUKA: Ako zelite da email i/ili telefon budu jedinstveni unutar SALONA za klijente:
userSchema.index({ salonId: 1, email: 1 }, { unique: true });
// userSchema.index({ salonId: 1, phone: 1 }, { unique: true }); // Ako je i telefon unique unutar salona

// userSchema.pre('save', function(next) {
//   this.updatedAt = Date.now(); // OVO UKLONITI ako koristite timestamps: true
//   next();
// });

module.exports = mongoose.model('Client', userSchema); // PREPORUKA: Preimenuj u 'Client' umjesto 'User'