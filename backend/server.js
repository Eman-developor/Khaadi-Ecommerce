const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dns").setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// MongoDB Atlas Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Product Routes
app.use("/api/products", productRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Khaadi Backend is running!");
});

// Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});