const AdminModel = require("../models/admin-model");
const bcrypt = require("bcrypt")
const HospitalModel = require("../models/hospital-model")


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

// hospitals
const addHospitalPage = (req, res) => {
    res.render("admin/add-new-hospital")
}
const createHospital = async (req, res) => {
    console.log(req.body)
    try {
        const hospital = await HospitalModel.create(req.body);
        let { image } = req.files;
        image.mv('./public/images/hospital/' + hospital._id + ".jpg").then((err) => {
            if (!err) {
                return res.redirect('/admin/view-all-hospitals')
            }
            res.redirect('/admin/add-hospital')
        })
    } catch (error) {
        console.log(error)
    }
}
const getAllHopitals = async (req, res) => {
    try {
        let hospitals = await HospitalModel.find({})
        if (hospitals.length != 0) {

            hospitals.forEach((hospital) => {
                hospital.total_doctors = hospital.doctors.length;
                hospital.total_dept = hospital.departments.length;
            })
        } else
            hospitals = false;
        res.render("admin/view-all-hospitals", { hospitals })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/admin")
    }
}
const deleteHospital = async (req, res) => {
    try {
        let { id } = req.params;
        let hospital = await HospitalModel.findOneAndDelete({ _id: id })
        res.redirect('/admin/view-all-hospitals')
    } catch (error) {
        console.log(error)
    }
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