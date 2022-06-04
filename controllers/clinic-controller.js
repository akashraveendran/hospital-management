const ClinicModel = require("../models/clinic-model");
const bcrypt = require("bcrypt")


const getHomePage = (req, res) => {
    const { clinic } = req.session
    res.render('clinic/profile', { title: 'Clinic', clinic });
}
const getLoginPage = (req, res) => {
    let { alertMessage } = req.session
    res.render('clinic/login', { title: 'clinic', alertMessage });
    delete req.session.alertMessage;
}
const doLogin = async (req, res) => {
    try {
        console.log(req.body, req.body.password);
        let { password } = req.body;
        const clinic = await ClinicModel.findOne({ email: req.body.email });
        if (clinic) {
            const exist = await bcrypt.compare(password, clinic.password);
            if (exist) {
                req.session.clinic = clinic;
                return res.redirect("/clinic")
            }
        }
        req.session.alertMessage = "Invalid clinic Credentials";
        res.redirect("/clinic/login");
    } catch (error) {
        console.log(error);
        req.session.alertMessage = "Error Occured. Please Retry !!!";
        res.redirect("/clinic/login")
    }
}
const doLogout = (req, res) => {
    req.session.clinic = false;
    req.session.alertMessage = "Logged out successfully";
    res.redirect("/clinic/login")
}
const updateProfilePage = (req, res) => {
    const { clinic } = req.session;
    res.render("clinic/update-profile", { clinic })
}
const updateProfile = async (req, res) => {
    try {
        const id = req.session.clinic._id
        console.log(req.body, id)
        let clinic = await ClinicModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        if (req.files) {
            let image = req.files.image;
            image.mv('./public/images/clinic/' + clinic._id + ".jpg").then((err) => {
                if (!err) {
                    req.session.clinic = clinic;
                    return res.redirect('/clinic')
                } else {
                    console.log(err);
                    req.session.alertMessage = "Error Occured while uploading image Try again !!!"
                    res.redirect("/clinic")
                }
            })
        } else {
            req.session.clinic = clinic;
            res.redirect('/clinic')
        }
    } catch (error) {
        console.log(error)
        req.session.alertMessage = "Error Occured Try again !!!"
        res.redirect("/clinic")
    }
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
    doLogout,
    updateProfilePage,
    viewAppoinments,
    acceptAppoinment,
    rejectAppoinment,
    completeAppoinment,
    updateProfile
}