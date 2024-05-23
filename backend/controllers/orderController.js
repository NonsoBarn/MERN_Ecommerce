const Order = require("../models/Order");

exports.createOrder = async (customer, data) => {
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

// Endpoint to get all orders

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Endpoint to get order by ID
exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId: userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
