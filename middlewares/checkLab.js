const checkLab = function (req, res, next) {
    if (!req.session.lab) {
        req.session.alertMessage = "Please Login to Continue"
        res.redirect('/lab/login');
    } else {
        next();
    }
}

module.exports = checkLab;