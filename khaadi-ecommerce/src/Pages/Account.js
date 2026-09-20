
import React from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Package,
  LogIn,
  UserPlus,
  ArrowRight,
} from "lucide-react";

function Account() {
  return (
    <div className="account-page">

      <section className="account-header">
        <p>WELCOME TO KHAADI</p>
        <h1>MY ACCOUNT</h1>
        <div className="account-line"></div>
        <span>Manage your account and orders</span>
      </section>

      <section className="account-content">

        <div className="account-icon">
          <UserRound size={38} strokeWidth={1.3} />
        </div>

        <h2>Welcome to Khaadi</h2>

        <p className="account-text">
          Sign in to your account or create a new account
          to enjoy a more personalised shopping experience.
        </p>

        <div className="account-buttons">

          <Link to="/login" className="account-button dark">
            <LogIn size={18} strokeWidth={1.5} />
            LOGIN
          </Link>

          <Link to="/register" className="account-button light">
            <UserPlus size={18} strokeWidth={1.5} />
            CREATE ACCOUNT
          </Link>

          <Link to="/admin-orders" className="orders-button">
            <Package size={18} strokeWidth={1.5} />
            MY ORDERS
            <ArrowRight size={17} strokeWidth={1.5} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Account;

