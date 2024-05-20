const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const fetchUser = require("../middleware/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", fetchUser, authController.logout);

module.exports = router;
