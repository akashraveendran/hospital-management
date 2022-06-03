const HospitalModel = require("../models/hospital-model");
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


module.exports = {
    getHomePage,
    getLoginPage,
    doLogin
}