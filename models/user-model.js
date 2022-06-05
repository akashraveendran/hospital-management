const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Must Provide name"],
        trim: true,
        maxlength: [65, "Name cannot be more than 25 characters"]
    }, email: {
        type: String,
        required: [true, "Must Provide email"],
        trim: true,
        maxlength: [25, "email cannot be more than 25 characters"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Must Provide phone-no"],
        trim: true,
        maxlength: [13, "phone no cannot be more than 25 characters"]
    },
    age: {
        type: String,
        required: [true, "Must Provide phone-no"],
        trim: true,
        maxlength: [5, "age no cannot be more than 5 characters"]
    },
    address: {
        type: String,
        required: [true, "Must Provide address"],
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', UserSchema);