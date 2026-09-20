
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import K1 from "../images/k-1.webp";
import K2 from "../images/k-2.webp";
import K3 from "../images/k-3.webp";
import K4 from "../images/k-4.webp";
import K13 from "../images/k-13.webp";
import K14 from "../images/k-14.webp";
import K15 from "../images/k-15.webp";
import K16 from "../images/k-16.webp";
import K17 from "../images/k-17.webp";
import K18 from "../images/k-18.webp";

function Cart() {
  const [product, setProduct] = useState(null);

  const productImages = {
    "k-1.webp": K1,
    "k-2.webp": K2,
    "k-3.webp": K3,
    "k-4.webp": K4,
    "k-13.webp": K13,
    "k-14.webp": K14,
    "k-15.webp": K15,
    "k-16.webp": K16,
    "k-17.webp": K17,
    "k-18.webp": K18,
  };

  useEffect(() => {
    const savedProduct = localStorage.getItem("cartProduct");

    if (savedProduct) {
      try {
        const parsedProduct = JSON.parse(savedProduct);

        const fixedProduct = {
          ...parsedProduct,
          quantity: Number(parsedProduct.quantity) || 1,
          price: Number(parsedProduct.price) || 0,
        };

        setProduct(fixedProduct);
      } catch (error) {
        console.log("Cart error:", error);
      }
    }
  }, []);

  const increaseQuantity = () => {
    const updatedProduct = {
      ...product,
      quantity: Number(product.quantity) + 1,
    };

    setProduct(updatedProduct);

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(updatedProduct)
    );
  };

  const decreaseQuantity = () => {
    if (product.quantity <= 1) {
      return;
    }

    const updatedProduct = {
      ...product,
      quantity: Number(product.quantity) - 1,
    };

    setProduct(updatedProduct);

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(updatedProduct)
    );
  };

  const removeProduct = () => {
    localStorage.removeItem("cartProduct");
    setProduct(null);
  };

  if (!product) {
    return (
      <section className="cart-section">
        <h1>Shopping Cart</h1>

        <h2>Your cart is empty.</h2>
      </section>
    );
  }

  const image = productImages[product.image];

  const total =
    Number(product.price) * Number(product.quantity);

  return (
    <section className="cart-section">

      <h1>Shopping Cart</h1>

      <div className="cart-container">

        <div className="cart-item">

          <div className="cart-image">
            {image ? (
              <img
                src={image}
                alt={product.name}
              />
            ) : (
              <p>Image not found</p>
            )}
          </div>

          <div className="cart-info">

            <h2>{product.name}</h2>

            <p>
              Price: PKR{" "}
              {Number(product.price).toLocaleString()}
            </p>

            <p>
              Category: {product.category}
            </p>

            <div className="cart-quantity">

              <button
                onClick={decreaseQuantity}
              >
                -
              </button>

              <span>
                {product.quantity}
              </span>

              <button
                onClick={increaseQuantity}
              >
                +
              </button>

            </div>

            <p className="cart-item-total">
              Item Total: PKR{" "}
              {total.toLocaleString()}
            </p>

            <button
              className="remove-btn"
              onClick={removeProduct}
            >
              REMOVE
            </button>

          </div>

        </div>

        <div className="cart-summary">

          <h2>Cart Summary</h2>

          <p>
            <span>Product:</span>

            <strong>
              {product.name}
            </strong>
          </p>

          <p>
            <span>Quantity:</span>

            <strong>
              {product.quantity}
            </strong>
          </p>

          <p>
            <span>Subtotal:</span>

            <strong>
              PKR {total.toLocaleString()}
            </strong>
          </p>

          <p>
            <span>Delivery:</span>

            <strong>Free</strong>
          </p>

          <hr />

          <h3>
            Total: PKR{" "}
            {total.toLocaleString()}
          </h3>

          <Link to="/checkout">
            <button className="checkout-btn">
              PROCEED TO CHECKOUT
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Cart;

