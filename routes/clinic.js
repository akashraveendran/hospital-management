const express = require('express');
const router = express.Router();

const { getHomePage,
    getLoginPage,
    doLogin,
    doLogout,
    updateProfilePage,
    viewAppoinments,
    acceptAppoinment,
    rejectAppoinment,
    updateProfile } = require("../controllers/clinic-controller")
const checkClinic = require("../middlewares/checkClinic")

/* GET home page. */
router.get('/', checkClinic, getHomePage);
router.get('/login', getLoginPage);
router.post('/login', doLogin);
router.get('/logout', checkClinic, doLogout);
router.get('/update-profile', checkClinic, updateProfilePage);
router.post('/update-profile', checkClinic, updateProfile);
router.get('/view-all-appoinments', checkClinic, viewAppoinments);
router.get('/accept-appoinment/:id', checkClinic, acceptAppoinment);
router.get('/reject-appoinment/:id', checkClinic, rejectAppoinment);

module.exports = router;
