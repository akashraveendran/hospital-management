const express = require('express');
const router = express.Router();

const { getHomePage } = require("../controllers/user-controller")

/* GET home page. */
router.get('/', getHomePage);

module.exports = router;
