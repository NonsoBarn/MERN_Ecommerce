const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
