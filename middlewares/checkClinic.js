const checkClinic = function (req, res, next) {
    if (!req.session.clinic) {
        req.session.alertMessage = "Please Login to Continue"
        res.redirect('/clinic/login');
    } else {
        next();
    }
}

module.exports = checkClinic;