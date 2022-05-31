const express = require('express');
const router = express.Router();

const { getHomePage } = require("../controllers/lab-controller")

/* GET home page. */
router.get('/', getHomePage);
router.get('/login');
router.post('/login');
router.get('/profile');
router.get('/view-all-tests');
router.get('/add-new-test');
router.get('/delete-test/:id');
router.get('/update-test/:id');
router.post('/update-test/:id');
router.get('/update-timings');
router.post('/update-timings');

module.exports = router;
