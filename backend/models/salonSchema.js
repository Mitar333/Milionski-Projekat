const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salonSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxLength: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please fill a valid phone number']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    logoUrl: {
        type: String,
        trim: true,
        default: null,
        maxLength: 2000
    },
    workingHours: {
    type: Map,
    of: new mongoose.Schema({
        // Vrijeme otvaranja (npr. "09:00")
        start: {
            type: String,
            // required: true, // Može biti opcionalno ako dani mogu biti zatvoreni
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // Regex za HH:MM format
        },
        // Vrijeme zatvaranja (npr. "17:00")
        end: {
            type: String,
            // required: true, // Može biti opcionalno
            match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        },
        // Dodatno polje za lakše prepoznavanje je li dan zatvoren
        isClosed: {
            type: Boolean,
            default: false
        }
    }, { _id: false }), // _id: false da ne kreira _id za poddokumente u mapi
    default: {}
},
    description: {
        type: String,
        trim: true,
        default: '',
        maxLength: 500
    }
}, { timestamps: true });

// salonSchema.pre('save', function(next) {
//   this.updatedAt = Date.now(); // OVO UKLONITI ako koristite timestamps: true
//   next();
// });

module.exports = mongoose.model('Salon', salonSchema);