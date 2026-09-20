import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

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

import K5 from "../images/k-5.webp";
import K6 from "../images/k-6.webp";
import K7 from "../images/k-7.webp";
import K8 from "../images/k-8.webp";

import K10 from "../images/k-10.webp";
import K11 from "../images/k-11.webp";
import K12 from "../images/k-12.webp";

function Home() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);

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

  const slides = [
    {
      image: K5,
      title: "NEW COLLECTION",
      text: "Discover timeless fashion for every occasion.",
    },
    {
      image: K6,
      title: "SUMMER COLLECTION",
      text: "Fresh styles made for your everyday look.",
    },
    {
      image: K7,
      title: "NEW ARRIVALS",
      text: "Explore our latest fashion collection.",
    },
    {
      image: K8,
      title: "SHOP THE LOOK",
      text: "Beautiful designs for every occasion.",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === slides.length - 1 ? 0 : previous + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      currentSlide === 0
        ? slides.length - 1
        : currentSlide - 1
    );
  };

  const selectCategory = (category) => {
    const section = document.getElementById(
      `${category.toLowerCase()}-collection`
    );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const addToCart = (product) => {
    const productWithQuantity = {
      ...product,
      quantity: 1,
    };

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(productWithQuantity)
    );

    alert(`${product.name} added to cart!`);
  };

  const womenProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === "women"
  );

  const menProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === "men"
  );

  const kidsProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === "kids"
  );

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return false;
    }

    const searchWords = query.split(/\s+/);

    const name = product.name?.toLowerCase() || "";

    const category =
      product.category?.toLowerCase() || "";

    const fullText = `${name} ${category}`;

    return searchWords.every((word) =>
      fullText.includes(word)
    );
  });

  const ProductCard = ({ product }) => {
    const image = productImages[product.image];

    return (
      <div className="collection-card">
        <Link to={`/product-details/${product._id}`}>
          {image ? (
            <img
              src={image}
              alt={product.name}
            />
          ) : (
            <div className="product-image-error">
              Image not found
            </div>
          )}
        </Link>

        <h3>{product.name}</h3>

        <p>
          PKR {product.price.toLocaleString()}
        </p>

        <Link to={`/product-details/${product._id}`}>
          <button>VIEW DETAILS</button>
        </Link>

        <button onClick={() => addToCart(product)}>
          ADD TO CART
        </button>
      </div>
    );
  };

  if (searchQuery) {
    return (
      <section className="search-results-section">
        {filteredProducts.length > 0 ? (
          <div className="collection-container">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="no-search-results">
            <h3>NO PRODUCTS FOUND</h3>

            <p>
              No products found for "{searchQuery}".
            </p>

            <Link to="/">BACK TO SHOP</Link>
          </div>
        )}
      </section>
    );
  }

  return (
    <>
      <section className="hero-slider">
        <img
          src={slides[currentSlide].image}
          alt="Fashion Collection"
          className="hero-slide-image"
        />

        <div className="hero-overlay">
          <h1>{slides[currentSlide].title}</h1>

          <p>{slides[currentSlide].text}</p>

          <button
            onClick={() => selectCategory("Women")}
          >
            SHOP NOW
          </button>
        </div>

        <button
          className="slider-btn prev"
          onClick={previousSlide}
        >
          ❮
        </button>

        <button
          className="slider-btn next"
          onClick={nextSlide}
        >
          ❯
        </button>

        <div className="slider-dots">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={
                currentSlide === index
                  ? "dot active"
                  : "dot"
              }
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2>SHOP BY CATEGORY</h2>

        <div className="category-container">
          <div className="category-card">
            <div className="category-image">
              <img
                src={K10}
                alt="Women Collection"
              />
            </div>

            <button
              onClick={() => selectCategory("Women")}
            >
              SHOP WOMEN
            </button>
          </div>

          <div className="category-card">
            <div className="category-image">
              <img
                src={K12}
                alt="Men Collection"
              />
            </div>

            <button
              onClick={() => selectCategory("Men")}
            >
              SHOP MEN
            </button>
          </div>

          <div className="category-card">
            <div className="category-image">
              <img
                src={K11}
                alt="Kids Collection"
              />
            </div>

            <button
              onClick={() => selectCategory("Kids")}
            >
              SHOP KIDS
            </button>
          </div>
        </div>
      </section>

      <section className="collection-section">
        <h2 className="collection-title">
          TOP PICKS
        </h2>

        <div className="collection-container">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section
        className="collection-section"
        id="women-collection"
      >
        <h2 className="collection-title">
          WOMEN COLLECTION
        </h2>

        <div className="collection-container">
          {womenProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section
        className="collection-section"
        id="men-collection"
      >
        <h2 className="collection-title">
          MEN COLLECTION
        </h2>

        <div className="collection-container">
          {menProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section
        className="collection-section"
        id="kids-collection"
      >
        <h2 className="collection-title">
          KIDS COLLECTION
        </h2>

        <div className="collection-container">
          {kidsProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;