const mongoose = require('mongoose');


const AppoinmentSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: [true, "Must Provide name"],
        trim: true,
        maxlength: [65, "Name cannot be more than 25 characters"]
    }, clinic: {
        type: Boolean,
        default: false
    }, hospital: {
        type: Boolean,
        default: false
    }, hospitalId: {
        type: String,
        trim: true,
        maxlength: [300, "password cannot be more than 300 characters"],
    }, clinicId: {
        type: String,
        trim: true,
    }, time: {
        type: String,
        required: [true, "Must Provide time"],
        trim: true,
    }, date: {
        type: String,
        required: [true, "Must Provide date"],
        trim: true,
        maxlength: [225, "password cannot be more than 125 characters"]
    }, patientName: {
        type: String,
        required: [true, "Must Provide date"],
        trim: true,
        maxlength: [225, "password cannot be more than 125 characters"]
    }, patientId: {
        type: String,
        required: [true, "Must Provide date"],
        trim: true,
        maxlength: [225, "password cannot be more than 125 characters"]
    }, patientAge: {
        type: String,
        required: true
    }, patientPhone: {
        type: String,
        required: true
    }, patientEmail: {
        type: String,
        required: true
    }, patientAddress: {
        type: String,
        required: true
    }, status: {
        type: String,
        default: "waiting list"
    }
})

module.exports = mongoose.model('appoinment', AppoinmentSchema);