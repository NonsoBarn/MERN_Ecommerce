const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const fetchUser = require("../middleware/auth");

router.get("/getallorders", orderController.getAllOrders);
router.get("/user/:userId", orderController.getOrdersByUserId);

// fetchUser,

module.exports = router;
