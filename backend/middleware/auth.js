const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }

  if (authController.isTokenBlacklisted(token)) {
    return res
      .status(401)
      .send({ errors: "Token has been blacklisted, please login again" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
