const express = require('express');
const router = express.Router();

const { getHomePage } = require("../controllers/admin-controller")

/* GET home page. */
router.get('/', getHomePage);
router.get("/login")
router.post("/login")
router.get("/view-all-hospitals")
router.get("/delete-hospital/:id")
// router.get("/update-hospital/:id")
// router.post("/update-hospital/:id")
router.get("/add-hospital")
router.post("/add-hospital")
router.get("/delete-hospital/:id")
router.get("/view-all-clinics")
router.get("/add-clinic")
router.post("/add-clinic")
router.get("/delete-clinic/:id")
// router.get("/update-clinic/:id")
// router.post("/update-clinic/:id")
router.get("/view-messages")
router.get("/send-message")
router.post("/send-message")
router.get("/view-checkup-dates")
router.get("/view-all-users")
router.get("/delete/user/:id")


module.exports = router;
