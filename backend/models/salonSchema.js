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
        monday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},
        tuesday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        wednesday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        thursday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        friday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        saturday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        sunday:
        {
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: false
            }
        }},
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
/*
workingHours: {
        monday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},
        tuesday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        wednesday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        thursday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        friday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        saturday:{
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: true
            }},        
        sunday:
        {
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            isOpen: {
                type: Boolean,
                default: false
            }
        }
*/