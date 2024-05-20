const jwt = require("jsonwebtoken");
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
  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.json({ success: true, token });
};

exports.login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && req.body.password === user.password) {
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, errors: "Invalid email or password" });
  }
};
