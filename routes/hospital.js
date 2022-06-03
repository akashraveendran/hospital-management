const express = require('express');
const router = express.Router();

const { getHomePage,
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
    completeAppoinment } = require("../controllers/hospital-controller")
const checkHospital = require("../middlewares/checkHospital")

/* GET home page. */
router.get('/', checkHospital, getHomePage);
router.get('/login', getLoginPage);
router.post('/login', doLogin);
// router.get('/view-profile');
router.get('/view-all-departments', checkHospital, viewAllDepartment);
router.get('/add-department', checkHospital, addDepartmentPage);
router.post('/add-department', checkHospital, addNewDepartment);
router.get('/delete-department/:id', checkHospital, deleteDepartment);
router.get('/view-all-doctors', checkHospital, viewAllDoctors);
router.get('/add-new-doctor', checkHospital, addDoctorPage);
router.post('/add-new-doctor', checkHospital, addNewDoctor);
router.get('/delete-doctor/:id', checkHospital, deleteDoctor);
router.get('/view-all-appoinments', checkHospital, viewAppoinments);
router.get('/accept-appoinment/:id', checkHospital, acceptAppoinment);
router.get('/reject-appoinment/:id', checkHospital, rejectAppoinment);
router.get('/completed-appoinment/:id', checkHospital, completeAppoinment);

module.exports = router;
