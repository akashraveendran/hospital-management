const mongoose = require("mongoose");



const TestSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    labName: {
        type: String,
        required: true
    },
    labId: {
        type: String,
        required: true
    },
    description: String,
    date: String,
})



module.exports = mongoose.model("test", TestSchema);