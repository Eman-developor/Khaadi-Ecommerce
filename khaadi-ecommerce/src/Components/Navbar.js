import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  UserRound,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

import KhaadiLogo from "../images/Khaadi-Logo.png";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    navigate(`/?search=${encodeURIComponent(value)}`);

    setSearchOpen(false);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">

        {/* KHAADI LOGO */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          <img
            src={KhaadiLogo}
            alt="Khaadi"
            className="khaadi-logo"
          />
        </Link>

        {/* NAVIGATION LINKS */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <Link
            to="/"
            onClick={closeMenu}
          >
            HOME
          </Link>

          <Link
            to="/"
            onClick={closeMenu}
          >
            NEW IN
          </Link>

          <Link
            to="/product-details/6aaeaf5fefb8adb91924338e"
            onClick={closeMenu}
          >
            PRODUCT DETAILS
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
          >
            ADD TO CART
          </Link>

          <Link
            to="/checkout"
            onClick={closeMenu}
          >
            CHECK OUT
          </Link>

        </div>

        {/* NAVBAR ICONS */}
        <div className="nav-icons">

          {/* SEARCH */}
          <button
            className="nav-icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search
              size={20}
              strokeWidth={1.7}
            />
          </button>

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="nav-icon"
            aria-label="Wishlist"
          >
            <Heart
              size={20}
              strokeWidth={1.7}
            />
          </Link>

          {/* ACCOUNT */}
          <Link
            to="/account"
            className="nav-icon"
            aria-label="Account"
          >
            <UserRound
              size={20}
              strokeWidth={1.7}
            />
          </Link>

          {/* SHOPPING BAG */}
          <Link
            to="/cart"
            className="nav-icon"
            aria-label="Shopping Bag"
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.7}
            />
          </Link>

          {/* MOBILE MENU */}
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X
                size={24}
                strokeWidth={1.7}
              />
            ) : (
              <Menu
                size={24}
                strokeWidth={1.7}
              />
            )}
          </button>

        </div>
      </nav>

      {/* SEARCH BAR */}
      {searchOpen && (
        <form
          className="navbar-search"
          onSubmit={handleSearch}
        >
          <Search
            size={20}
            strokeWidth={1.7}
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <button type="submit">
            SEARCH
          </button>

          <button
            type="button"
            className="close-search"
            onClick={() => {
              setSearchOpen(false);
              setSearch("");
            }}
            aria-label="Close Search"
          >
            <X size={20} />
          </button>
        </form>
      )}
    </>
  );
}

export default Navbar;