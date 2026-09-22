
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://khaadi-ecommerce-production.up.railway.app";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const localImages = {
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
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (productId) => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    navigate(`/product-details/${productId}`);
  };

  if (loading) {
    return (
      <section className="products-section">
        <h2>Our Products</h2>
        <p>Loading products...</p>
      </section>
    );
  }

  return (
    <section className="products-section">
      <h2>Our Products</h2>

      <p>Explore our latest collection.</p>

      <div className="products-container">
        {products.map((product) => {
          const imageName = String(product.image || "")
            .trim()
            .toLowerCase();

          const productImage = localImages[imageName];

          return (
            <div
              className="product-card"
              key={product._id}
            >
              {productImage ? (
                <img
                  src={productImage}
                  alt={product.name}
                />
              ) : (
                <div className="image-not-found">
                  Image not found
                </div>
              )}

              <h3>{product.name}</h3>

              <p>
                PKR {Number(product.price).toLocaleString()}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleViewDetails(product._id)
                }
              >
                VIEW DETAILS
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Product;
