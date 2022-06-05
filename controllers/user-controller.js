const bcrypt = require("bcrypt")
const UserModel = require("../models/user-model")
const HospitalModel = require("../models/hospital-model");
const ClinicModel = require("../models/clinic-model");
const DepartmentModel = require("../models/department-model");
const LabModel = require("../models/laboratory-model");
const MessageModel = require("../models/message-model");
const DoctorModel = require("../models/doctor-model");


const getHomePage = (req, res) => {
    res.render('index', { title: 'user' });
}
const getSignupPage = (req, res) => {
    let { alertMessage } = req.session
    res.render('user/signup', { title: 'User', alertMessage });
    delete req.session.alertMessage;
}
const doSignup = async (req, res) => {
    try {
        console.log(req.body, req.body.password);
        let { password } = req.body;
        req.body.password = await bcrypt.hash(password, 10)
        const user = await UserModel.create(req.body);
        let { image } = req.files;
        image.mv('./public/images/user/' + user._id + ".jpg").then((err) => {
            if (!err) {
                req.session.alertMessage = "signup successfully completed"
                return res.redirect('/login')
            }
            res.redirect('/login')
        })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Couldn't perform signup Please Retry (with a new email) !!!";
        res.redirect("/signup")
    }
}
const getLoginPage = (req, res) => {
    let { alertMessage } = req.session
    res.render('user/login', { title: 'user', alertMessage });
    delete req.session.alertMessage;
}
const doLogin = async (req, res) => {
    try {
        console.log(req.body, req.body.password);
        let { password } = req.body;
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            const exist = await bcrypt.compare(password, user.password);
            if (exist) {
                req.session.user = user;
                return res.redirect("/");
            }
        }
        req.session.alertMessage = "Invalid user Credentials";
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/login")
    }
}
const logout = (req, res) => {
    req.session.user = false;
    req.session.alertMessage = "Logged out successfully";
    res.redirect("/login")
}
const updateProfilePage = (req, res) => {
    const { user } = req.session;
    res.render("user/update-profile", { user })
}
const updateProfile = async (req, res) => {
    try {
        const { _id } = req.session.user
        console.log(req.body, _id)
        let user = await UserModel.findOneAndUpdate({ _id }, req.body, { new: true })
        if (req.files) {
            let image = req.files.image;
            image.mv('./public/images/user/' + user._id + ".jpg").then((err) => {
                if (!err) {
                    req.session.user = user;
                    return res.redirect('/')
                } else {
                    console.log(err);
                    req.session.alertMessage = "Error Occured while uploading image Try again !!!"
                    res.redirect("/")
                }
            })
        } else {
            console.log(user)
            req.session.user = user;
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/")
    }
}

const getHospitals = async (req, res) => {
    try {
        let hospitals = await HospitalModel.find({})
        if (hospitals.length != 0) {
            hospitals.forEach((hospital) => {
                hospital.total_doctors = hospital.doctors.length;
                hospital.total_dept = hospital.departments.length;
            })
        } else
            hospitals = false;
        res.render("user/view-all-hospitals", { hospitals })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/")
    }
}
const getClinics = async (req, res) => {
    try {
        let clinics = await ClinicModel.find({})
        res.render("user/view-all-clinics", { clinics })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/")
    }
}
const getLabs = async (req, res) => {
    try {
        let labs = await LabModel.find({})
        res.render("user/view-all-labs", { labs })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/")
    }
}
const getSingleHospital = async (req, res) => {
    try {
        let { id } = req.params;
        let hospital = await HospitalModel.findOne({ _id: id })
        let doctors = await DoctorModel.find({ hospitalId: id })
        let departments = await DepartmentModel.find({ hospitalId: id })
        res.render("user/view-hospital", { hospital, doctors, departments })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/")
    }
}



module.exports = {
    getHomePage,
    getSignupPage,
    doSignup,
    getLoginPage,
    doLogin,
    logout,
    updateProfilePage,
    updateProfile,
    getHospitals,
    getClinics,
    getSingleHospital,
    getLabs
}