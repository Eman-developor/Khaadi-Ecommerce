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

// MongoDB Atlas Connection
mongoose
  .connect(
    "mongodb+srv://shariq84d_db_user:Emankhan46@khaadicluster.cob1rov.mongodb.net/khaadiDB?retryWrites=true&w=majority&appName=KhaadiCluster"
  )
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
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});