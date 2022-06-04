const LabModel = require("../models/laboratory-model")
const HospitalModel = require("../models/hospital-model");
const ClinicModel = require("../models/clinic-model");
const TestModel = require("../models/test-model");
const bcrypt = require("bcrypt")

const getHomePage = (req, res) => {
    const { lab } = req.session
    res.render('lab/profile', { title: 'Laboratory', lab });
}

const getSignupPage = (req, res) => {
    let { alertMessage } = req.session
    res.render('lab/signup', { title: 'lab', alertMessage });
    delete req.session.alertMessage;
}
const doSignup = async (req, res) => {
    try {
        console.log(req.body, req.body.password);
        let { password } = req.body;
        req.body.password = await bcrypt.hash(password, 10)
        const lab = await LabModel.create(req.body);
        let { image } = req.files;
        image.mv('./public/images/lab/' + lab._id + ".jpg").then((err) => {
            if (!err) {
                req.session.alertMessage = "Please wait for the approval of admin"
                return res.redirect('/lab/login')
            }
            res.redirect('/lab/login')
        })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/lab/signup")
    }
}
const getLoginPage = (req, res) => {
    let { alertMessage } = req.session
    res.render('lab/login', { title: 'lab', alertMessage });
    delete req.session.alertMessage;
}
const doLogin = async (req, res) => {
    try {
        console.log(req.body, req.body.password);
        let { password } = req.body;
        const lab = await LabModel.findOne({ email: req.body.email });
        if (lab) {
            const exist = await bcrypt.compare(password, lab.password);
            if (exist) {
                req.session.lab = lab;
                return res.redirect("/lab");
            }
        }
        req.session.alertMessage = "Invalid lab Credentials";
        res.redirect("/lab/login");
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/lab/login")
    }
}
const logout = (req, res) => {
    req.session.lab = false;
    req.session.alertMessage = "Logged out successfully";
    res.redirect("/lab/login")
}
const updateProfilePage = (req, res) => {
    const { lab } = req.session;
    res.render("lab/update-profile", { lab })
}
const updateProfile = async (req, res) => {
    try {
        const id = req.session.lab._id
        console.log(req.body, id)
        let lab = await LabModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        if (req.files) {
            let image = req.files.image;
            image.mv('./public/images/lab/' + lab._id + ".jpg").then((err) => {
                if (!err) {
                    req.session.lab = lab;
                    return res.redirect('/lab')
                } else {
                    console.log(err);
                    req.session.alertMessage = "Error Occured while uploading image Try again !!!"
                    res.redirect("/lab")
                }
            })
        } else {
            req.session.lab = lab;
            res.redirect('/lab')
        }
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/lab")
    }
}
const addTestpage = (req, res) => {
    res.render("lab/add-test")
}
const addNewTest = async (req, res) => {
    console.log(req.body);
    try {
        let { labName, _id } = req.session.lab;
        req.body.labName = labName;
        req.body.labId = _id;
        req.body.date = new Date().toLocaleDateString();
        let test = await TestModel.create(req.body);
        req.session.alertMessage = "Added New Test"
        res.redirect("/lab/view-all-tests")
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/lab")
    }
}
const viewTests = async (req, res) => {
    try {
        let tests = await TestModel.find({})
        res.render("lab/view-all-tests", { tests })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/lab")
    }
}
const deleteTest = (req, res) => {
    res.send("lab route")
}
const viewAllClinics = async (req, res) => {
    try {
        let clinics = await ClinicModel.find({})
        res.render("lab/view-all-clinics", { clinics })
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/lab")
    }
}
const viewAllHospitals = async (req, res) => {
    try {
        let hospitals = await HospitalModel.find({})
        if (hospitals.length != 0) {
            hospitals.forEach((hospital) => {
                hospital.total_doctors = hospital.doctors.length;
                hospital.total_dept = hospital.departments.length;
            })
        } else
            hospitals = false;
        res.render("lab/view-all-hospitals", { hospitals })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/lab");
    }
}


module.exports = {
    getHomePage,
    doSignup,
    getSignupPage,
    getLoginPage,
    doLogin,
    updateProfile,
    updateProfilePage,
    addTestpage,
    addNewTest,
    viewTests,
    deleteTest,
    viewAllClinics,
    viewAllHospitals,
    logout
}