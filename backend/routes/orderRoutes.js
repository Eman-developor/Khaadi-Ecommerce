
const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder
    });

  } catch (error) {
    res.status(400).json({
      message: "Error placing order",
      error: error.message
    });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message
    });
  }
});

module.exports = router;

