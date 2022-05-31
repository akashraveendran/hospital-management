const express = require('express');
const router = express.Router();

const { getHomePage } = require("../controllers/clinic-controller")

/* GET home page. */
router.get('/', getHomePage);
router.get('/login');
router.post('/login');
router.get('/profile');
router.get('/update-profile');
router.post('/update-profile');
router.post('/update-timings');
router.get('/view-all-appoinments');
router.get('/accept-appoinment/:id');
router.get('/reject-appoinment/:id');
router.get('/completed-ckeckup/:id');

module.exports = router;
