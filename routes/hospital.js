const express = require('express');
const router = express.Router();

const { getHomePage, getLoginPage, doLogin } = require("../controllers/hospital-controller")
const checkHospital = require("../middlewares/checkHospital")

/* GET home page. */
router.get('/', checkHospital, getHomePage);
router.get('/login', getLoginPage);
router.post('/login', doLogin);
router.get('/view-profile');
router.get('/view-all-departments');
router.get('/add-department');
router.post('/add-department');
router.get('/view-all-doctors');
router.get('/add-new-doctor');
router.post('/add-new-doctor');
router.get('/view-all-appoinments');
router.get('/update-appoinment/:id');

module.exports = router;
