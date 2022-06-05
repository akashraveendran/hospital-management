const mongoose = require("mongoose");



const departmentSchema = new mongoose.Schema({
    department: String,
    shortName: String,
    description: String,
    date: String,
    hospitalId: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model("department", departmentSchema);