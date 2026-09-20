
import React, { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
      });
  }, []);

  return (
    <section className="admin-orders">

      <h1>Admin Orders</h1>

      {orders.length === 0 ? (
        <h2>No orders found.</h2>
      ) : (
        <div className="orders-container">

          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              <h2>Order #{order._id}</h2>

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
                {order.product.name}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                PKR {order.product.price.toLocaleString()}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {order.product.quantity}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                PKR {order.total.toLocaleString()}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.paymentMethod}
              </p>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default AdminOrders;

