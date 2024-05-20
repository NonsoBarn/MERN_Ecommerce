const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { user, items, total, status } = req.body;

    // Log the incoming data to debug
    console.log("Received order data:", { user, items, total, status });

    // Convert string IDs to ObjectId and validate the data
    const parsedItems = items.map((item) => {
      if (!item.price) {
        throw new Error("Item price is required");
      }
      return {
        product: new mongoose.Types.ObjectId(item.product),
        quantity: item.quantity,
        price: item.price,
      };
    });

    const newOrder = new Order({
      user: new mongoose.Types.ObjectId(user),
      items: parsedItems,
      total,
      status,
    });

    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("items.product");
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
