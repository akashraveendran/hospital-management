const checkHospital = function (req, res, next) {
    if (!req.session.hospital) {
        req.session.alertMessage = "Please Login to Continue"
        res.redirect('/hospital/login');
    } else {
        next();
    }
}

module.exports = checkHospital;