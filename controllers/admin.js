const express = require("express");
const router = express.Router();
const isSignedIn = require("../middleware/is-signed-in");
const isAdmin = require("../middleware/is-admin");

// routes
router.get("/orders",isSignedIn, isAdmin, async (req, res) => {
  const orders = await Order.find().populate("user").populate("items.product");
  res.render("/sign-up", { orders });
});


module.exports = router;
