const mongoose = require('mongoose');


const HospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: [true, "Must Provide name"],
        trim: true,
        maxlength: [65, "Name cannot be more than 25 characters"]
    }, email: {
        type: String,
        required: [true, "Must Provide email"],
        trim: true,
        maxlength: [105, "email cannot be more than 105 characters"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Must Provide password"],
        trim: true,
        maxlength: [300, "password cannot be more than 300 characters"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Must Provide phone-no"],
        trim: true,
        maxlength: [13, "phone no cannot be more than 25 characters"]
    },
    description: {
        type: String,
        required: [true, "Must Provide password"],
        trim: true,
    },
    place: {
        type: String,
        required: [true, "Must Provide place"],
        trim: true,
        maxlength: [225, "password cannot be more than 125 characters"]
    },
    departments: {
        type: Array,
        default: []
    },
    doctors: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('hospital', HospitalSchema);