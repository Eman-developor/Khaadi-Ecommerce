
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  product: {
    name: String,
    price: Number,
    quantity: Number
  },

  total: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    default: "Cash on Delivery"
  }
});

module.exports = mongoose.model("Order", orderSchema);

