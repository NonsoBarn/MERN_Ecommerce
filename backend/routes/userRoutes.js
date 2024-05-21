const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const fetchUser = require("../middleware/auth");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;

router.get("/allusers", userController.getAllUsers);
router.get("/getuser", fetchUser, userController.getUser);
router.post("/removeuser", userController.removeUser);
router.post("/addtocart", fetchUser, userController.addToCart);
router.post("/removefromcart", fetchUser, userController.removeFromCart);
router.post("/getcart", fetchUser, userController.getCart);

////// Stripe

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "ngn",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.new_price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://127.0.0.1:5173/paysuccess",
    cancel_url: "http://127.0.0.1:5173/paycancel",
  });

  res.json({ id: session.id });
});

module.exports = router;
