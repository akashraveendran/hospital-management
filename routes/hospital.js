const express = require('express');
const router = express.Router();

const { getHomePage } = require("../controllers/hospital-controller")

/* GET home page. */
router.get('/', getHomePage);
router.get('/login');
router.post('/login');
router.get('/view-profile');
router.get('/view-all-departments');
router.get('/add-department');
router.get('/add-department');
router.post('/add-department');
router.get('/view-all-doctors');
router.get('/add-new-doctor');
router.post('/add-new-doctor');
router.get('/view-all-appoinments');
router.get('/update-appoinment/:id');

module.exports = router;
