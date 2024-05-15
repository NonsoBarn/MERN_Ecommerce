const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// MongoDB connection string
const connectionString =
  "mongodb+srv://nonsobarn:<password>@cluster0.asoq4xw.mongodb.net/BabcockMall?retryWrites=true&w=majority&appName=Cluster0";

// Replace '<password>' with your actual password
const dbPassword = "cjHslBmOR2d9wVhN";
const finalConnectionString = connectionString.replace(
  "<password>",
  dbPassword
);

app.get("/", (req, res) => {
  res.send("Express app is Running");
});

// image storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Image end point
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for product

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Add product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//delete product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
});

// User model
const User = mongoose.model("User", {
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Registering User
app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  console.log("Existing user:", check);
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with email",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// login endpoint
app.post("/login", async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    const passMatch = req.body.password === user.password;
    if (passMatch) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Address" });
  }
});

// getting all users
app.get("/allusers", async (req, res) => {
  let users = await User.find({});
  console.log("All Users Fetched");
  res.send(users);
});

////////////////////////////////////////////////////////////////////////

// New product endpoint
app.get("/newproducts", async (req, res) => {
  let products = await Product.find({});
  let newproduct = products.slice(1).slice(-8);
  console.log("new products fetched");
  res.send(newproduct);
});

// popular product endpoint
app.get("/popularproducts", async (req, res) => {
  let products = await Product.find({ category: "clothing" });
  let popularproduct = products.slice(0, 4);
  console.log("popular products fetched");
  res.send(popularproduct);
});

// middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid login" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using valid login" });
    }
  }
};

// add user cart data endpoint
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body, req.itemId);

  let userData = await User.findOne({
    _id: req.user.id,
  });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

// remove user cart data endpoint
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body, req.itemId);

  let userData = await User.findOne({
    _id: req.user.id,
  });

  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

// end point to get cart data
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("get cart");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Connect to MongoDB
mongoose
  .connect(finalConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
