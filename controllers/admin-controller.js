const AdminModel = require("../models/admin-model");
const bcrypt = require("bcrypt")
const HospitalModel = require("../models/hospital-model");
const ClinicModel = require("../models/clinic-model");
const UserModel = require("../models/user-model")
const LabModel = require("../models/laboratory-model")
const AppoinmentModel = require("../models/appoinment-model");
const MessageModel = require("../models/message-model")


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
        // console.log(req.body, req.body.password);
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
const getHomePage = async (req, res) => {
    try {
        let count = {}
        count.hospital = await HospitalModel.count();
        count.clinic = await ClinicModel.count();
        count.message = await MessageModel.count();
        count.user = await UserModel.count();
        count.appoinment = await AppoinmentModel.count();
        count.lab = await LabModel.count();
        res.render('admin/admin-dashboard', { title: 'Admin-dashbard', count });
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error occured Retry !!!"
        res.redirect("/admin/login")
    }
}
const doLogout = (req, res) => {
    req.session.admin = false;
    req.session.alertMessage = "Logged out successfully";
    res.redirect("/admin/login")
}

// hospitals
const addHospitalPage = (req, res) => {
    res.render("admin/add-new-hospital")
}
const createHospital = async (req, res) => {
    // console.log(req.body)
    try {
        const { password } = req.body;
        req.body.password = await bcrypt.hash(password, 10)
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
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/admin")
    }
}
const getAllClinics = async (req, res) => {
    try {
        let clinics = await ClinicModel.find({})
        res.render("admin/view-all-clinics", { clinics })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/admin")
    }
}
const getAllLabs = async (req, res) => {
    try {
        let labs = await LabModel.find({})
        res.render("admin/view-all-labs", { labs })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/admin")
    }
}
const addClinicPage = (req, res) => {
    res.render("admin/add-new-clinic")
}
const createClinic = async (req, res) => {
    console.log(req.body)
    try {
        const { password } = req.body;
        req.body.password = await bcrypt.hash(password, 10)
        const clinic = await ClinicModel.create(req.body);
        let { image } = req.files;
        image.mv('./public/images/clinic/' + clinic._id + ".jpg").then((err) => {
            if (!err) {
                return res.redirect('/admin/view-all-clinics')
            }
            res.redirect('/admin/add-clinic')
        })
    } catch (error) {
        console.log(error)
    }
}
const deleteClinic = async (req, res) => {
    try {
        let { id } = req.params;
        await ClinicModel.findOneAndDelete({ _id: id })
        res.redirect('/admin/view-all-clinics')
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/admin")
    }
}
const viewAllMessages = async (req, res) => {
    try {
        let inbox = await MessageModel.find({ to: "Admin" })
        let outbox = await MessageModel.find({ from: "Admin" })
        res.render("admin/view-all-messages", { inbox, outbox })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/admin")
    }
}
const sendMessagePage = (req, res) => {
    let { email } = req.params;
    res.render("admin/send-message", { email })
}
const sendMessage = async (req, res) => {
    console.log(req.body)
    let today = new Date();
    req.body.date = today.toLocaleDateString();
    req.body.time = today.toLocaleTimeString();

    try {
        const message = await MessageModel.create(req.body);
        res.redirect('/admin/view-messages');
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured try again !!!"
        res.redirect('/admin/add-message')
    }
}
const deleteMessage = async (req, res) => {
    try {
        let { id } = req.params;
        await MessageModel.findOneAndDelete({ _id: id })
        res.redirect('/admin/view-messages')
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/admin")
    }
}
const viewCheckupDatesPage = async (req, res) => {
    try {
        let appoinments = await AppoinmentModel.find({});
        res.render("admin/view-checkup-dates", { appoinments })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/admin");
    }
}
const viewAllUsersPage = async (req, res) => {
    try {
        let users = await UserModel.find({});
        res.render("admin/view-all-users", { users })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/admin");
    }
}
const deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        let users = await UserModel.findOneAndDelete({ _id: id });
        res.render("admin/view-all-users", { users })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/admin");
    }
}


module.exports = {
    getHomePage,
    getLoginPage,
    doLogin,
    doLogout,
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
    deleteMessage,
    viewCheckupDatesPage,
    viewAllUsersPage,
    deleteUser,
    getAllLabs
}