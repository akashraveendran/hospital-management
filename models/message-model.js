const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    message: String,
    date: String,
    time: String
})

module.exports = mongoose.model("message", MessageSchema);