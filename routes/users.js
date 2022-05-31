const express = require('express');
const router = express.Router();

const { getHomePage } = require("../controllers/user-controller")

/* GET home page. */
router.get('/', getHomePage);
router.get('/signup');
router.post('/signup');
router.get('/login');
router.post('/login');
router.get('/view-profile');
router.get('/update-profile');
router.post('/update-profile');
router.get('/view-hospitals');
router.get('/view-clinics');
router.post('/search');//get the searched category from req.body
router.get('/book-hospital/:id');
router.get('/book-clinic/:id');
router.get('/view-messages');
router.get('/send-message');
router.post('/send-message');

module.exports = router;