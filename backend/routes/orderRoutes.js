const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const fetchUser = require("../middleware/auth");
const stripe = require("../config/stripe");
const Order = require("../models/Order");

router.post("/create", fetchUser, orderController.createOrder);
router.get("/:id", fetchUser, orderController.getOrder);
router.get("/", fetchUser, orderController.getAllOrders);
router.put("/:id/status", fetchUser, orderController.updateOrderStatus);
router.delete("/:id", fetchUser, orderController.deleteOrder);

module.exports = router;
