import React, { useState } from "react";

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

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://khaadi-ecommerce-production.up.railway.app";

function Checkout() {
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

  const getCartProduct = () => {
    const savedProduct =
      localStorage.getItem("cartProduct");

    if (!savedProduct) {
      return null;
    }

    try {
      const parsedProduct =
        JSON.parse(savedProduct);

      return {
        ...parsedProduct,
        price: Number(parsedProduct.price),
        quantity:
          Number(parsedProduct.quantity) || 1,
      };
    } catch (error) {
      console.log(
        "Cart data error:",
        error
      );

      return null;
    }
  };

  const [product, setProduct] = useState(
    getCartProduct()
  );

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [placedOrder, setPlacedOrder] =
    useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value,
    });
  };

  const placeOrder = async () => {
    const currentProduct =
      getCartProduct();

    if (!currentProduct) {
      alert("Your cart is empty.");
      return;
    }

    setProduct(currentProduct);

    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      alert(
        "Please fill all billing details."
      );
      return;
    }

    const total =
      currentProduct.price *
      currentProduct.quantity;

    const orderData = {
      customerName:
        formData.customerName,

      email:
        formData.email,

      phone:
        formData.phone,

      address:
        formData.address,

      city:
        formData.city,

      product: {
        name:
          currentProduct.name,

        image:
          currentProduct.image,

        category:
          currentProduct.category,

        price:
          currentProduct.price,

        quantity:
          currentProduct.quantity,
      },

      total: total,

      paymentMethod:
        "Cash on Delivery",
    };

    try {
      const response =
        await fetch(
          `${API_URL}/api/orders`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(orderData),
          }
        );

      const data =
        await response.json();

      if (response.ok) {
        setPlacedOrder(
          orderData
        );

        setOrderPlaced(
          true
        );

        localStorage.removeItem(
          "cartProduct"
        );
      } else {
        alert(
          data.message ||
          "Something went wrong."
        );
      }
    } catch (error) {
      console.log(
        "Order error:",
        error
      );

      alert(
        "Unable to place order. Please check your backend."
      );
    }
  };

  if (orderPlaced && placedOrder) {
    const image =
      productImages[
        placedOrder.product.image
      ];

    return (
      <section className="checkout-section">
        <div className="order-success">
          <h1>
            ORDER PLACED SUCCESSFULLY!
          </h1>

          <p>
            Thank you for your order.
          </p>

          <div className="placed-order-details">
            <div className="placed-product">
              {image && (
                <img
                  src={image}
                  alt={
                    placedOrder.product.name
                  }
                />
              )}

              <div>
                <h2>
                  {placedOrder.product.name}
                </h2>

                <p>
                  Category:{" "}
                  {placedOrder.product.category}
                </p>

                <p>
                  Price: PKR{" "}
                  {Number(
                    placedOrder.product.price
                  ).toLocaleString()}
                </p>

                <p>
                  Quantity:{" "}
                  {placedOrder.product.quantity}
                </p>

                <p>
                  Total: PKR{" "}
                  {Number(
                    placedOrder.total
                  ).toLocaleString()}
                </p>

                <p>
                  Payment: Cash on Delivery
                </p>
              </div>
            </div>

            <hr />

            <h3>
              Customer Details
            </h3>

            <p>
              Name:{" "}
              {placedOrder.customerName}
            </p>

            <p>
              Email:{" "}
              {placedOrder.email}
            </p>

            <p>
              Phone:{" "}
              {placedOrder.phone}
            </p>

            <p>
              Address:{" "}
              {placedOrder.address}
            </p>

            <p>
              City:{" "}
              {placedOrder.city}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="checkout-section">
        <h1>
          Checkout
        </h1>

        <div className="empty-checkout">
          <h2>
            Your cart is empty.
          </h2>

          <p>
            Please add a product to your
            cart before going to checkout.
          </p>
        </div>
      </section>
    );
  }

  const image =
    productImages[product.image];

  const total =
    product.price *
    product.quantity;

  return (
    <section className="checkout-section">
      <h1>
        Checkout
      </h1>

      <div className="checkout-container">
        <div className="checkout-form">
          <h2>
            Billing Details
          </h2>

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="customerName"
            placeholder="Enter your full name"
            value={
              formData.customerName
            }
            onChange={
              handleChange
            }
          />

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
          />

          <label>
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
          />

          <label>
            Address
          </label>

          <textarea
            name="address"
            placeholder="Enter your complete address"
            value={
              formData.address
            }
            onChange={
              handleChange
            }
          ></textarea>

          <label>
            City
          </label>

          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={
              formData.city
            }
            onChange={
              handleChange
            }
          />

          <h2>
            Payment Method
          </h2>

          <div className="payment-option">
            <input
              type="radio"
              defaultChecked
            />

            <span>
              Cash on Delivery
            </span>
          </div>

          <button
            className="place-order"
            onClick={
              placeOrder
            }
          >
            PLACE ORDER
          </button>
        </div>

        <div className="order-summary">
          <h2>
            Order Summary
          </h2>

          <div className="checkout-product">
            {image && (
              <img
                src={image}
                alt={product.name}
              />
            )}

            <div>
              <h3>
                {product.name}
              </h3>

              <p>
                Category:{" "}
                {product.category}
              </p>

              <p>
                Price: PKR{" "}
                {product.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="summary-row">
            <span>
              Quantity
            </span>

            <strong>
              {product.quantity}
            </strong>
          </div>

          <div className="summary-row">
            <span>
              Subtotal
            </span>

            <strong>
              PKR{" "}
              {total.toLocaleString()}
            </strong>
          </div>

          <div className="summary-row">
            <span>
              Delivery
            </span>

            <strong>
              Free
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>
              Total
            </span>

            <strong>
              PKR{" "}
              {total.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;