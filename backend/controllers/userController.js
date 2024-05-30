const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.removeUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.addToCart = async (req, res) => {
  try {
    let userData = await User.findById(req.user.id);
    userData.cartData[req.body.itemId] += 1;
    await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
    res.send("Added");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.user.id);
    if (userData.cartData[req.body.itemId] > 0)
      userData.cartData[req.body.itemId] -= 1;
    await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
    res.send("Removed");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.getCart = async (req, res) => {
  try {
    let userData = await User.findById(req.user.id);
    res.json(userData.cartData);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.clearCart = async (req, res) => {
  try {
    let userData = await User.findById(req.user.id);
    userData.cartData = {};
    await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
    res
      .status(200)
      .send({ success: true, message: "Cart cleared successfully." });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
