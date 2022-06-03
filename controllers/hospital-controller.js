const HospitalModel = require("../models/hospital-model");
const DepartmentModel = require("../models/department-model");
const DoctorModel = require("../models/doctor-model");
const bcrypt = require("bcrypt")



const getHomePage = async (req, res) => {
    const { hospital } = req.session
    try {
        let count = {};
        count.departments = await DepartmentModel.count()
        count.doctors = await DoctorModel.count()
        // count.appoinments
        res.render('hospital/profile', { title: 'Hospital', hospital, count });
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/hospital/login")
    }
}
const getLoginPage = (req, res) => {
    let { alertMessage } = req.session
    res.render('hospital/login', { title: 'Hospital', alertMessage });
    delete req.session.alertMessage;
}
const doLogin = async (req, res) => {
    try {
        console.log(req.body, req.body.password);
        let { password } = req.body;
        const hospital = await HospitalModel.findOne({ email: req.body.email });
        if (hospital) {
            const exist = await bcrypt.compare(password, hospital.password);
            if (exist) {
                req.session.hospital = hospital;
                return res.redirect("/hospital")
            }
        }
        req.session.alertMessage = "Invalid hospital Credentials";
        res.redirect("/hospital/login");
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/hospital/login")
    }
}
const addDepartmentPage = (req, res) => {
    res.render("hospital/add-department")
}
const addNewDepartment = async (req, res) => {
    console.log(req.body);
    try {
        req.body.date = new Date().toLocaleDateString();
        let dept = await DepartmentModel.create(req.body);
        req.session.alertMessage = "Added Department"
        res.redirect("/hospital/view-all-departments")
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/hospital")
    }
}
const viewAllDepartment = async (req, res) => {
    try {
        let departments = await DepartmentModel.find({});
        console.log(departments)
        let { alertMessage } = req.session;
        res.render("hospital/view-departments", { departments, alertMessage })
        delete req.session.alertMessage;
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/hospital")
    }
}
const deleteDepartment = async (req, res) => {
    try {
        let { id } = req.params;
        await DepartmentModel.findOneAndDelete({ _id: id })
        res.redirect('/hospital/view-all-departments')
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/hospital")
    }
}
const addNewDoctor = async (req, res) => {
    try {
        // console.log(req.body, req.files.image)
        const doctor = await DoctorModel.create(req.body);
        let { image } = req.files;
        image.mv('./public/images/doctor/' + doctor._id + ".jpg").then((err) => {
            if (!err) {
                return res.redirect('/hospital/view-all-doctors')
            }
            res.redirect('/hospital/add-new-doctor')
        })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/hospital/add-new-doctor")
    }
}
const addDoctorPage = async (req, res) => {
    try {
        let departments = await DepartmentModel.find({})
        res.render("hospital/add-doctor", { departments })
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/hospital")
    }
}
const viewAllDoctors = async (req, res) => {
    try {
        let doctors = await DoctorModel.find({});
        // console.log(doctors)
        let { alertMessage } = req.session;
        res.render("hospital/view-doctors", { doctors, alertMessage })
        delete req.session.alertMessage;
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error occured please try again"
        res.redirect("/hospital")
    }
}
const deleteDoctor = async (req, res) => {
    try {
        let { id } = req.params;
        await DoctorModel.findOneAndDelete({ _id: id })
        req.session.alertMessage = "Removed Doctor successfully !!!"
        res.redirect('/hospital/view-all-doctors')
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/hospital")
    }
}
const viewAppoinments = (req, res) => {
    res.render("hospital/view-appoinments")
}
const acceptAppoinment = (req, res) => {

}
const rejectAppoinment = (req, res) => {

}
const completeAppoinment = (req, res) => {

}


module.exports = {
    getHomePage,
    getLoginPage,
    doLogin,
    viewAllDepartment,
    addDepartmentPage,
    addNewDepartment,
    deleteDepartment,
    addNewDoctor,
    addDoctorPage,
    viewAllDoctors,
    deleteDoctor,
    viewAppoinments,
    acceptAppoinment,
    rejectAppoinment,
    completeAppoinment
}