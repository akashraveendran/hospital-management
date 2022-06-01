const express = require('express');
const router = express.Router();

const {
    getHomePage,
    getLoginPage,
    doLogin,
    getAllHopitals,
    addHospitalPage,
    createHospital,
    deleteHospital,
    getAllClinics,
    addClinicPage,
    createClinic,
    deleteClinic,
    viewAllMessages,
    sendMessagePage,
    sendMessage,
    deleteMessage,
    viewCheckupDatesPage,
    viewAllUsersPage,
    deleteUser
} = require("../controllers/admin-controller");
const checkAdmin = require('../middlewares/checkAdmin');

/* GET home page. */
router.get('/', checkAdmin, getHomePage);
router.get("/login", getLoginPage)
router.post("/login", doLogin)
router.get("/view-all-hospitals", checkAdmin, getAllHopitals)
router.get("/delete-hospital/:id", checkAdmin, deleteHospital)
// router.get("/update-hospital/:id")
// router.post("/update-hospital/:id")
router.get("/add-hospital", checkAdmin, addHospitalPage)
router.post("/add-hospital", checkAdmin, createHospital)
router.get("/view-all-clinics", checkAdmin, getAllClinics)
router.get("/add-clinic", checkAdmin, addClinicPage)
router.post("/add-clinic", checkAdmin, createClinic)
router.get("/delete-clinic/:id", checkAdmin, deleteClinic)
// router.get("/update-clinic/:id")
// router.post("/update-clinic/:id")
router.get("/view-messages", checkAdmin, viewAllMessages)
router.get("/send-message/:id", checkAdmin, sendMessagePage)
router.post("/send-message", checkAdmin, sendMessage)
router.get("/delete-message/:id", checkAdmin, deleteMessage)
router.get("/view-checkup-dates", viewCheckupDatesPage)
router.get("/view-all-users", viewAllUsersPage)
router.get("/delete/user/:id", deleteUser)


module.exports = router;
