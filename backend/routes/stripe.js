const express = require("express");
// const orderController = require("../controllers/orderController");
const Order = require("../models/Order");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Stripe checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { products, userId } = req.body;
  // console.log(products);

  // Trim the product data to include only essential fields
  const trimmedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.new_price,
    quantity: product.quantity,
  }));

  // Ensure the trimmed data fits within 500 characters
  const cartMetadata = JSON.stringify(trimmedProducts);
  // console.log(cartMetadata);
  if (cartMetadata.length > 500) {
    return res
      .status(400)
      .json({ error: "Cart metadata exceeds 500 characters" });
  }

  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        cart: cartMetadata,
      },
    });

    // console.log(customer);

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
      customer: customer.id,
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/paysuccess",
      cancel_url: "http://localhost:5173/paycancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    total: data.amount_total,
    shipping: data.customer_details,
  });
  try {
    const savedOrder = await newOrder.save();

    console.log("processed order:", savedOrder);
    return savedOrder;
  } catch (err) {
    console.log(err);
  }
};

// Stripe web hook
let endpointSecret;
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;
    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("Webhook verified");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
          console.log(customer);
          console.log(data);
        })
        .catch((err) => console.log(err.message));
    }

    res.send().end();
  }
);

module.exports = router;
