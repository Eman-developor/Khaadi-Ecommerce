import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import K1 from "../images/k-1.webp";
import K2 from "../images/k-2.webp";
import K3 from "../images/k-3.webp";
import K4 from "../images/k-4.webp";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://khaadi-ecommerce-production.up.railway.app";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const localImages = {
    "k-1.webp": K1,
    "k-2.webp": K2,
    "k-3.webp": K3,
    "k-4.webp": K4,
  };

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

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
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={
                localImages[product.image] ||
                `/images/${product.image}`
              }
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>
              PKR {product.price.toLocaleString()}
            </p>

            <Link to={`/product-details/${product._id}`}>
              <button>VIEW DETAILS</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Product;