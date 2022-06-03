const mongoose = require("mongoose");



const departmentSchema = new mongoose.Schema({
    department: String,
    shortName: String,
    description: String,
    date: String
})



module.exports = mongoose.model("department", departmentSchema);