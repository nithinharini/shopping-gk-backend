const express = require("express");
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:productId", protect, updateCart);
router.delete("/:productId", protect, removeFromCart);

module.exports = router;