
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Main product images
import K1 from "../images/k-1.webp";
import K2 from "../images/k-2.webp";
import K3 from "../images/k-3.webp";
import K4 from "../images/k-4.webp";

import K5 from "../images/k-5.webp";
import K6 from "../images/k-6.webp";
import K7 from "../images/k-7.webp";
import K8 from "../images/k-8.webp";

import K10 from "../images/k-10.webp";
import K11 from "../images/k-11.webp";
import K12 from "../images/k-12.webp";

import K13 from "../images/k-13.webp";
import K14 from "../images/k-14.webp";
import K15 from "../images/k-15.webp";
import K16 from "../images/k-16.webp";
import K17 from "../images/k-17.webp";
import K18 from "../images/k-18.webp";

// K-1 gallery
import K11Gallery from "../images/k-1-1.webp";
import K12Gallery from "../images/k-1-2.webp";
import K13Gallery from "../images/k-1-3.webp";
import K14Gallery from "../images/k-1-4.webp";

// K-2 gallery
import K21 from "../images/k-2-1.webp";
import K22 from "../images/k-2-2.webp";
import K23 from "../images/k-2-3.webp";
import K24 from "../images/k-2-4.webp";

// K-3 gallery
import K31 from "../images/k-3-1.webp";
import K32 from "../images/k-3-2.webp";
import K33 from "../images/k-3-3.webp";
import K34 from "../images/k-3-4.webp";

// K-4 gallery
import K41 from "../images/k-4-1.webp";
import K42 from "../images/k-4-2.webp";
import K43 from "../images/k-4-3.webp";
import K44 from "../images/k-4-4.webp";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://khaadi-ecommerce-production.up.railway.app";

const productImages = {
  "k-1.webp": K1,
  "k-2.webp": K2,
  "k-3.webp": K3,
  "k-4.webp": K4,

  "k-5.webp": K5,
  "k-6.webp": K6,
  "k-7.webp": K7,
  "k-8.webp": K8,

  "k-10.webp": K10,
  "k-11.webp": K11,
  "k-12.webp": K12,

  "k-13.webp": K13,
  "k-14.webp": K14,
  "k-15.webp": K15,
  "k-16.webp": K16,
  "k-17.webp": K17,
  "k-18.webp": K18,

  // K-1 gallery
  "k-1-1.webp": K11Gallery,
  "k-1-2.webp": K12Gallery,
  "k-1-3.webp": K13Gallery,
  "k-1-4.webp": K14Gallery,

  // K-2 gallery
  "k-2-1.webp": K21,
  "k-2-2.webp": K22,
  "k-2-3.webp": K23,
  "k-2-4.webp": K24,

  // K-3 gallery
  "k-3-1.webp": K31,
  "k-3-2.webp": K32,
  "k-3-3.webp": K33,
  "k-3-4.webp": K34,

  // K-4 gallery
  "k-4-1.webp": K41,
  "k-4-2.webp": K42,
  "k-4-3.webp": K43,
  "k-4-4.webp": K44,
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);

        const mainImageName = String(data.image || "")
          .trim()
          .toLowerCase();

        const firstGalleryImage =
          data.images && data.images.length > 0
            ? productImages[
                String(data.images[0]).trim().toLowerCase()
              ]
            : null;

        const firstImage =
          firstGalleryImage ||
          productImages[mainImageName] ||
          null;

        setSelectedImage(firstImage);
        setQuantity(1);
      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const productWithQuantity = {
      ...product,
      quantity: Number(quantity),
    };

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(productWithQuantity)
    );

    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="product-loading">
        <h2>Loading product...</h2>
      </div>
    );
  }

  let galleryImages = [];

  if (product.images && product.images.length > 0) {
    galleryImages = product.images
      .map((imageName) => {
        const cleanName = String(imageName)
          .trim()
          .toLowerCase();

        return productImages[cleanName];
      })
      .filter(Boolean);
  }

  if (galleryImages.length === 0) {
    const mainProductImageName = String(
      product.image || ""
    )
      .trim()
      .toLowerCase();

    const mainProductImage =
      productImages[mainProductImageName];

    if (mainProductImage) {
      galleryImages = [mainProductImage];
    }
  }

  const mainImage =
    selectedImage || galleryImages[0];

  return (
    <section className="product-details-page">

      <div className="product-details">

        <div className="product-gallery">

          <div className="product-thumbnails">

            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${
                  mainImage === image
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedImage(image)
                }
              >
                <img
                  src={image}
                  alt={`${product.name} ${
                    index + 1
                  }`}
                />
              </button>
            ))}

          </div>

          <div className="main-product-image">

            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
              />
            ) : (
              <div className="product-image-error">
                Image not found
              </div>
            )}

          </div>

        </div>

        <div className="details-info">

          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <h2>
            PKR{" "}
            {Number(
              product.price
            ).toLocaleString()}
          </h2>

          <p className="product-description">
            Discover our beautiful Khaadi-style
            collection, designed with quality fabric
            and elegant details for your everyday
            look.
          </p>

          <div className="product-divider"></div>

          <p className="product-stock">
            ✓ In Stock
          </p>

          <label className="quantity-label">
            Quantity
          </label>

          <div className="quantity">

            <button
              onClick={() =>
                setQuantity(
                  quantity > 1
                    ? quantity - 1
                    : 1
                )
              }
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>

          </div>

          <button
            className="add-cart"
            onClick={addToCart}
          >
            ADD TO CART
          </button>

          <div className="product-extra-info">

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Product ID:</strong>{" "}
              {product._id}
            </p>

            <p>
              <strong>Delivery:</strong>{" "}
              Free delivery available
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;

