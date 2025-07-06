// models/ownerSchema.js - Ažurirana verzija
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please fill a valid phone number']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
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
}, { timestamps: true });

module.exports = mongoose.model('Owner', ownerSchema);