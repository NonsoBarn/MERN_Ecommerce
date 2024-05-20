const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  let users = await User.find({});
  res.send(users);
};

exports.removeUser = async (req, res) => {
  await User.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
};

exports.addToCart = async (req, res) => {
  let userData = await User.findById(req.user.id);
  userData.cartData[req.body.itemId] += 1;
  await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.send("Added");
};

exports.removeFromCart = async (req, res) => {
  let userData = await User.findById(req.user.id);
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.send("Removed");
};

exports.getCart = async (req, res) => {
  let userData = await User.findById(req.user.id);
  res.json(userData.cartData);
};
