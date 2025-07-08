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
        minlength: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false // Ovo je bitno!
    },
    phone: {
        type: String,
        trim: true,
        match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please fill a valid phone number']
    },
    notes: {
        type: String,
        trim: true,
        default: '',
        maxLength: 500
    },
    // Dodato za resetovanje lozinke
    passwordResetToken: String,
    passwordResetExpires: Date
}, { timestamps: true });

userSchema.index({ salonId: 1, email: 1 }, { unique: true });
// userSchema.index({ salonId: 1, phone: 1 }, { unique: true, sparse: true }); // Ako je telefon unique

// Optional: Hash password before saving
// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

module.exports = mongoose.model('User', userSchema);