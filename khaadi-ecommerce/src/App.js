
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import AdminOrders from "./Pages/AdminOrders";
import Footer from "./Components/Footer";

import FAQ from "./Pages/FAQ";
import Contact from "./Pages/Contact";
import Shipping from "./Pages/Shipping";
import Returns from "./Pages/Returns";
import About from "./Pages/About";
import StoreLocator from "./Pages/StoreLocator";
import Careers from "./Pages/Careers";
import Privacy from "./Pages/Privacy";

import Wishlist from "./Pages/Wishlist";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* PRODUCT */}
        <Route
          path="/product-details/:id"
          element={<ProductDetails />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* WISHLIST */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ACCOUNT */}
        <Route
          path="/account"
          element={<Account />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN ORDERS */}
        <Route
          path="/admin-orders"
          element={<AdminOrders />}
        />

        {/* FOOTER PAGES */}
        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/shipping"
          element={<Shipping />}
        />

        <Route
          path="/returns"
          element={<Returns />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/stores"
          element={<StoreLocator />}
        />

        <Route
          path="/careers"
          element={<Careers />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;

