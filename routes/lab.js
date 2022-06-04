const express = require('express');
const router = express.Router();

const {
    getHomePage,
    doSignup,
    getSignupPage,
    getLoginPage,
    doLogin,
    logout,
    updateProfile,
    updateProfilePage,
    addTestpage,
    addNewTest,
    viewTests,
    deleteTest,
    viewAllClinics,
    viewAllHospitals } = require("../controllers/lab-controller")
const checkLab = require("../middlewares/checkLab")

/* GET home page. */
router.get('/', checkLab, getHomePage);
router.get('/signup', getSignupPage);
router.post('/signup', doSignup);
router.get('/login', getLoginPage);
router.post('/login', doLogin);
router.get('/logout', logout);
router.get('/update-profile', checkLab, updateProfilePage);
router.post('/update-profile', checkLab, updateProfile);
router.get('/add-new-test', addTestpage);
router.post('/add-new-test', addNewTest);
router.get('/view-all-tests', viewTests);
router.get('/delete-test/:id', deleteTest);
router.get('/view-all-clinics', viewAllClinics);
router.get('/view-all-hospitals', viewAllHospitals);

module.exports = router;
