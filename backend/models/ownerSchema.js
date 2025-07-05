const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    // Uklonjeno salonId iz ownerSchema jer Owner može imati više salona (salonIds)
    // Ako se Owner registruje sa inicijalnim salonom, salonId se dodaje u salonIds listu.
    // Ako Owner ima samo jedan salon, onda je ovo ok.
    // Međutim, ranije smo pričali o salonIds listi u Owner modelu
    // SalonId je ovdje redundantno ako imate salonIds listu

    email: {
        type: String,
        required: true,
        unique: true, // Unique je ok za email Ownera (njihova prijava)
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        // unique: true, // OPREZ: Kao što smo rekli, ovo je globalno unique, što je retko potrebno za telefon. Bolje je ukloniti.
        match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please fill a valid phone number']
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // DODATO: Minimum dužine lozinke je dobra ideja za sam Mongoose model, pored hashiranja.
    },
    role: {
        type: String,
        enum: ['owner', 'admin'],
        default: 'owner',
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    // OVDJE BI TREBALO BITI `salonIds` ako jedan owner može imati više salona
    salonIds: [{ type: Schema.Types.ObjectId, ref: 'Salon', required: true }],
    
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }); // PREPORUKA: Koristi ovo!

// ownerSchema.pre('save', function(next) {
//   this.updatedAt = Date.now(); // OVO UKLONITI ako koristite timestamps: true
//   next();
// });

module.exports = mongoose.model('Owner', ownerSchema);