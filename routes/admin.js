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
    viewCheckupDatesPage,
    viewAllUsersPage,
    deleteUser
} = require("../controllers/admin-controller");
const checkAdmin = require('../middlewares/checkAdmin');

/* GET home page. */
router.get('/', checkAdmin, getHomePage);
router.get("/login", getLoginPage)
router.post("/login", doLogin)
router.get("/view-all-hospitals", getAllHopitals)
router.get("/delete-hospital/:id", deleteHospital)
// router.get("/update-hospital/:id")
// router.post("/update-hospital/:id")
router.get("/add-hospital", addHospitalPage)
router.post("/add-hospital", createHospital)
router.get("/view-all-clinics", getAllClinics)
router.get("/add-clinic", addClinicPage)
router.post("/add-clinic", createClinic)
router.get("/delete-clinic/:id", deleteClinic)
// router.get("/update-clinic/:id")
// router.post("/update-clinic/:id")
router.get("/view-messages", viewAllMessages)
router.get("/send-message", sendMessagePage)
router.post("/send-message", sendMessage)
router.get("/view-checkup-dates", viewCheckupDatesPage)
router.get("/view-all-users", viewAllUsersPage)
router.get("/delete/user/:id", deleteUser)


module.exports = router;
