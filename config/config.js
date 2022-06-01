const mongoose = require("mongoose");


const connect = () => {

    return mongoose.connect("mongodb+srv://user01:1234@ecommerceweb.3j3ck.mongodb.net/hospital_Lab?retryWrites=true&w=majority")
}


module.exports = connect;