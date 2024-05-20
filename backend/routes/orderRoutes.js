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

router.post("/create-checkout-session", async (req, res) => {
  const { items, userId } = req.body;

  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: "ngn",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100, // Convert Naira to Kobo
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        userId,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
