const mongoose = require('mongoose');


const LabModel = new mongoose.Schema({
    labName: {
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
    description: {
        type: String,
        required: [true, "Must Provide bio"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Must Provide address"],
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    openingTime: String,
    closingTime: String
})

module.exports = mongoose.model('lab', LabModel);