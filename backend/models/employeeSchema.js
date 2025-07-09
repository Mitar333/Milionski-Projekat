const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Salon',
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxLength: 100
    },
    bio: {
        type: String,
        default: "",
        maxLength: 500
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
        match: [/.+@.+\\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false // Ovo je bitno!
    },
    servicesOffered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    schedule: {
        type: Map,
        of: String,
        default: {}
    },
    // Dodato za resetovanje lozinke
    passwordResetToken: String,
    passwordResetExpires: Date
}, { timestamps: true });

EmployeeSchema.index({ salonId: 1, email: 1 }, { unique: true });
EmployeeSchema.index({ salonId: 1, phone: 1 }, { unique: true, sparse: true });

// Optional: Hash password before saving
// EmployeeSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

module.exports = mongoose.model('Employee', EmployeeSchema);