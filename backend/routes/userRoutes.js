const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const fetchUser = require("../middleware/auth");

router.get("/allusers", userController.getAllUsers);
router.get("/getuser", fetchUser, userController.getUser);
router.post("/removeuser", userController.removeUser);
router.post("/addtocart", fetchUser, userController.addToCart);
router.post("/removefromcart", fetchUser, userController.removeFromCart);
router.post("/getcart", fetchUser, userController.getCart);

module.exports = router;
