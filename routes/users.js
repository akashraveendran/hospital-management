const express = require('express');
const router = express.Router();

const {
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
    getLabs,
    bookClinicPage,
    bookClinic,
    bookHospital,
    bookHospitalPage,
    getAppoinments,
    cancelAppoinment } = require("../controllers/user-controller");
const checkUser = require("../middlewares/checkUser")


router.get('/', checkUser, getHomePage);
router.get('/signup', getSignupPage);
router.post('/signup', doSignup);
router.get('/login', getLoginPage);
router.post('/login', doLogin);
router.get('/logout', checkUser, logout);
router.get('/update-profile', checkUser, updateProfilePage);
router.post('/update-profile', checkUser, updateProfile);
router.get('/view-hospitals', checkUser, getHospitals);
router.get('/view-hospital/:id', checkUser, getSingleHospital);
router.get('/view-clinics', checkUser, getClinics);
router.get('/view-labs', checkUser, getLabs);
router.post('/search');//get the searched category from req.body
router.get('/book-doctor/:id', checkUser, bookHospitalPage);
router.post('/book-doctor/:id', checkUser, bookHospital);
router.get('/book-clinic/:id', checkUser, bookClinicPage);
router.post('/book-clinic/:id', checkUser, bookClinic);
router.get('/view-appoinments', checkUser, getAppoinments);
router.get('/cancel-appoinment/:id', checkUser, cancelAppoinment);
// router.get('/view-messages', checkUser);
// router.get('/send-message', checkUser);
// router.post('/send-message', checkUser);

module.exports = router;