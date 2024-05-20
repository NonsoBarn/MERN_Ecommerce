const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signup = async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "Existing user found with email" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const data = { user: { id: user.id } };
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ success: true, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, errors: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, errors: "Invalid email or password" });
  }

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ success: true, token });
};

// Mock token blacklist (in-memory for simplicity, consider using Redis or a database)
const tokenBlacklist = new Set();

exports.logout = (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(400)
      .json({ success: false, errors: "No token provided" });
  }
  tokenBlacklist.add(token);
  res.json({ success: true, message: "Logged out successfully" });
};

exports.isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};
