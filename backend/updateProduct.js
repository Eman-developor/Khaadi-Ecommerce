const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGO_URI =
  "mongodb+srv://shariq84d_db_user:Emankhan46@khaadicluster.cob1rov.mongodb.net/khaadiDB?retryWrites=true&w=majority&appName=KhaadiCluster";

const products = [
  {
    name: "Printed Lawn Suit",
    price: 3499,
    image: "k-1.webp",
    images: [
      "k-1-1.webp",
      "k-1-2.webp",
      "k-1-3.webp",
      "k-1-4.webp"
    ],
    category: "Women"
  },
  {
    name: "Embroidered Kurta",
    price: 2999,
    image: "k-2.webp",
    images: [
      "k-2-1.webp",
      "k-2-2.webp",
      "k-2-3.webp",
      "k-2-4.webp"
    ],
    category: "Women"
  },
  {
    name: "Cotton 2 Piece",
    price: 4299,
    image: "k-3.webp",
    images: [
      "k-3-1.webp",
      "k-3-2.webp",
      "k-3-3.webp",
      "k-3-4.webp"
    ],
    category: "Women"
  },
  {
    name: "Printed Shirt",
    price: 2499,
    image: "k-4.webp",
    images: [
      "k-4-1.webp",
      "k-4-2.webp",
      "k-4-3.webp",
      "k-4-4.webp"
    ],
    category: "Women"
  },
  {
    name: "Men Kurta",
    price: 2999,
    image: "k-13.webp",
    category: "Men"
  },
  {
    name: "Men Cotton Kurta",
    price: 3499,
    image: "k-14.webp",
    category: "Men"
  },
  {
    name: "Men Printed Kurta",
    price: 3999,
    image: "k-15.webp",
    category: "Men"
  },
  {
    name: "Kids Printed Dress",
    price: 1999,
    image: "k-16.webp",
    category: "Kids"
  },
  {
    name: "Kids Cotton Dress",
    price: 2299,
    image: "k-17.webp",
    category: "Kids"
  },
  {
    name: "Kids Embroidered Dress",
    price: 2499,
    image: "k-18.webp",
    category: "Kids"
  }
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB Atlas connected!");

    await Product.deleteMany({});

    const insertedProducts = await Product.insertMany(products);

    console.log(
      `${insertedProducts.length} products added successfully to Atlas!`
    );

    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  })
  .catch((error) => {
    console.log("Error:", error);
  });