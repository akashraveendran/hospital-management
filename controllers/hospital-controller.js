const HospitalModel = require("../models/hospital-model");
const DepartmentModel = require("../models/department-model");
const bcrypt = require("bcrypt")



const getHomePage = (req, res) => {
    res.render('index', { title: 'Hospital' });
}
const getLoginPage = (req, res) => {
    res.render('hospital/login', { title: 'Hospital' });
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
const addNewDoctor = (req, res) => {

}
const addDoctorPage = (req, res) => {

}
const viewAllDoctors = (req, res) => {

}
const deleteDoctor = (req, res) => {

}
const viewAppoinments = (req, res) => {

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