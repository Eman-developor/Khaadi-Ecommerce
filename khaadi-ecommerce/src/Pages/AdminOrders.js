import React, { useEffect, useState } from "react";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://khaadi-ecommerce-production.up.railway.app";

function AdminOrders() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    images: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  // =========================
  // FETCH PRODUCTS
  // =========================
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
    }
  };

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // =========================
  // FORM INPUT
  // =========================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      images: "",
      category: "",
    });

    setEditingId(null);
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.image ||
      !formData.category
    ) {
      setMessage("Please fill all required fields.");
      return;
    }

    const productData = {
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
      images: formData.images
        ? formData.images
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : [],
      category: formData.category,
    };

    try {
      let response;

      if (editingId) {
        // UPDATE
        response = await fetch(
          `${API_URL}/api/products/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );
      } else {
        // ADD
        response = await fetch(`${API_URL}/api/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(
        editingId
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      resetForm();

      // Refresh products
      fetchProducts();
    } catch (error) {
      console.error("Product error:", error);
      setMessage(error.message);
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name || "",
      price: product.price || "",
      image: product.image || "",
      images: product.images
        ? product.images.join(", ")
        : "",
      category: product.category || "",
    });

    setMessage("Editing product...");
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setMessage("Product deleted successfully!");

      // Refresh products
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage(error.message);
    }
  };

  return (
    <section className="admin-dashboard">

      {/* =========================
          ADMIN HEADER
      ========================= */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage products and customer orders</p>
      </div>

      {/* =========================
          PRODUCT MANAGEMENT
      ========================= */}
      <div className="admin-product-section">

        <h2>
          {editingId ? "Update Product" : "Add New Product"}
        </h2>

        {message && (
          <p className="admin-message">
            {message}
          </p>
        )}

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Product Name *</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label>Price *</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>

          <div className="form-group">
            <label>Main Image *</label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Example: k-1.webp"
            />
          </div>

          <div className="form-group">
            <label>Additional Images</label>

            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="Example: k-2.webp, k-3.webp"
            />
          </div>

          <div className="form-group">
            <label>Category *</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">
                Select Category
              </option>

              <option value="Women">
                Women
              </option>

              <option value="Men">
                Men
              </option>

              <option value="Kids">
                Kids
              </option>
            </select>
          </div>

          <div className="form-buttons">

            <button
              type="submit"
              className="admin-add-btn"
            >
              {editingId
                ? "UPDATE PRODUCT"
                : "ADD PRODUCT"}
            </button>

            {editingId && (
              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => {
                  resetForm();
                  setMessage("");
                }}
              >
                CANCEL
              </button>
            )}

          </div>

        </form>
      </div>

      {/* =========================
          PRODUCT LIST
      ========================= */}
      <div className="admin-product-list">

        <h2>Manage Products</h2>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="admin-products-container">

            {products.map((product) => (
              <div
                className="admin-product-card"
                key={product._id}
              >

                <div className="admin-product-info">

                  <h3>{product.name}</h3>

                  <p>
                    <strong>Price:</strong>{" "}
                    PKR{" "}
                    {Number(product.price).toLocaleString()}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {product.category}
                  </p>

                  <p>
                    <strong>Image:</strong>{" "}
                    {product.image}
                  </p>

                  <p className="product-id">
                    <strong>ID:</strong>{" "}
                    {product._id}
                  </p>

                </div>

                <div className="admin-product-actions">

                  <button
                    type="button"
                    className="admin-edit-btn"
                    onClick={() =>
                      handleEdit(product)
                    }
                  >
                    EDIT
                  </button>

                  <button
                    type="button"
                    className="admin-delete-btn"
                    onClick={() =>
                      handleDelete(product._id)
                    }
                  >
                    DELETE
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* =========================
          ORDERS
      ========================= */}
      <div className="admin-orders">

        <h2>Customer Orders</h2>

        {orders.length === 0 ? (
          <h3>No orders found.</h3>
        ) : (
          <div className="orders-container">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order._id}
              >

                <h3>
                  Order #{order._id}
                </h3>

                <p>
                  <strong>Customer:</strong>{" "}
                  {order.customerName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {order.city}
                </p>

                <hr />

                <p>
                  <strong>Product:</strong>{" "}
                  {order.product?.name || "N/A"}
                </p>

                <p>
                  <strong>Price:</strong>{" "}
                  PKR{" "}
                  {Number(
                    order.product?.price || 0
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {order.product?.quantity || 0}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  PKR{" "}
                  {Number(
                    order.total || 0
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paymentMethod}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}

export default AdminOrders;