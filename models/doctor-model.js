const mongoose = require('mongoose');


const DoctorModel = new mongoose.Schema({
    doctorName: {
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
    phone: {
        type: String,
        required: [true, "Must Provide phone-no"],
        trim: true,
        maxlength: [13, "phone no cannot be more than 25 characters"]
    },
    bio: {
        type: String,
        required: [true, "Must Provide bio"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Must Provide address"],
        trim: true,
    },
    department: {
        type: String,
        required: true
    },
    specialisation: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('doctor', DoctorModel);