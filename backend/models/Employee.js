const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['In Office', 'Remote', 'Out of Office'],
        default: 'In Office'
    },
    online: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        default: 'Headquarters'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema); 