const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

  const product = new Product({
    id: id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
};

exports.removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
};

exports.getAllProducts = async (req, res) => {
  let products = await Product.find({});
  res.send(products);
};

exports.getNewProducts = async (req, res) => {
  let products = await Product.find({});
  let newproduct = products.slice(-8);
  res.send(newproduct);
};

exports.getPopularProducts = async (req, res) => {
  let products = await Product.find({ category: "groceries" });
  let popularproduct = products.slice(0, 4);
  res.send(popularproduct);
};

exports.getRelatedProducts = async (req, res) => {
  let products = await Product.find({});
  let relatedproduct = products.slice(0, 4);
  res.send(relatedproduct);
};
