import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Trash2 } from "lucide-react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (product) => product._id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <div className="wishlist-page">

      {/* PAGE HEADER */}
      <section className="wishlist-header">
        <p className="wishlist-small-title">
          KHAADI COLLECTION
        </p>

        <h1>MY WISHLIST</h1>

        <div className="wishlist-line"></div>

        <p>
          Your favourite pieces, all in one place.
        </p>
      </section>


      {/* EMPTY WISHLIST */}
      {wishlist.length === 0 ? (

        <section className="wishlist-empty">

          <div className="wishlist-heart">
            <Heart
              size={42}
              strokeWidth={1.2}
            />
          </div>

          <h2>
            YOUR WISHLIST IS EMPTY
          </h2>

          <p>
            Discover something you love and save it
            here for later.
          </p>

          <Link
            to="/"
            className="wishlist-shop-button"
          >
            SHOP COLLECTION

            <ArrowRight
              size={18}
              strokeWidth={1.5}
            />
          </Link>

        </section>

      ) : (

        /* WISHLIST PRODUCTS */
        <section className="wishlist-products">

          <div className="wishlist-count">
            {wishlist.length} ITEMS
          </div>

          <div className="wishlist-grid">

            {wishlist.map((product) => (

              <div
                className="wishlist-product"
                key={product._id}
              >

                <div className="wishlist-image-box">

                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                  />

                  <button
                    className="wishlist-remove"
                    onClick={() =>
                      removeFromWishlist(product._id)
                    }
                    aria-label="Remove from wishlist"
                  >
                    <Trash2
                      size={18}
                      strokeWidth={1.5}
                    />
                  </button>

                </div>

                <div className="wishlist-product-info">

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    PKR {product.price.toLocaleString()}
                  </p>

                  <Link
                    to={`/product-details/${product._id}`}
                    className="wishlist-view"
                  >
                    VIEW PRODUCT
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

    </div>
  );
}

export default Wishlist;