const AdminModel = require("../models/admin-model");
const bcrypt = require("bcrypt")


const getLoginPage = async (req, res) => {
    if (req.session.alertMessage) {
        let { alertMessage } = req.session;
        res.render("admin/login", { alertMessage })
        delete req.session.alertMessage
    } else {
        res.render("admin/login")
    }
}
const doLogin = async (req, res) => {
    try {
        console.log(req.body, req.body.password);
        let { password } = req.body;
        const admin = await AdminModel.findOne({ email: req.body.email });
        if (admin) {
            const exist = await bcrypt.compare(password, admin.password);
            if (exist) {
                req.session.admin = admin;
                return res.redirect("/admin")
            }
        }
        req.session.alertMessage = "Invalid admin Credentials";
        res.redirect("/admin/login");
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/admin/login")
    }
}
const getHomePage = (req, res) => {
    res.render('index', { title: 'Admin' });
}
const getAllHopitals = (req, res) => {
    res.send("all hospitals request");
}
const deleteHospital = (req, res) => {
    res.send("delete hospital request");
}
const addHospitalPage = (req, res) => {
    res.send("add hospital page get request");
}
const createHospital = (req, res) => {
    res.send("add hospital page post request");
}
const getAllClinics = (req, res) => {
    res.send("all hospitals request");
}
const addClinicPage = (req, res) => {
    res.send("add clinic page get request");
}
const createClinic = (req, res) => {
    res.send("add clinic page post request");
}
const deleteClinic = (req, res) => {
    res.send("delete clinic page  request");
}
const viewAllMessages = (req, res) => {
    res.send("view clinic messages")
}
const sendMessagePage = (req, res) => {
    res.send("send message get request")
}
const sendMessage = (req, res) => {
    res.send("send message to admin")
}

const viewCheckupDatesPage = (req, res) => {
    res.send("checkup dates")
}
const viewAllUsersPage = (req, res) => {
    res.send("view all users")
}
const deleteUser = (req, res) => {
    res.send("delete user")
}




module.exports = {
    getHomePage,
    getLoginPage,
    doLogin,
    getAllHopitals,
    addHospitalPage,
    createHospital,
    deleteHospital,
    getAllClinics,
    addClinicPage,
    createClinic,
    deleteClinic,
    viewAllMessages,
    sendMessagePage,
    sendMessage,
    viewCheckupDatesPage,
    viewAllUsersPage,
    deleteUser
}