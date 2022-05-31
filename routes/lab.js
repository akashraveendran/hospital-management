var express = require('express');
var router = express.Router();

const { getHomePage } = require("../controllers/lab-controller")

/* GET home page. */
router.get('/', getHomePage);

module.exports = router;
