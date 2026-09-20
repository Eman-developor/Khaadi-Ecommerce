
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, ArrowRight } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="login-page">

      <section className="login-header">
        <p>JOIN KHAADI</p>
        <h1>CREATE ACCOUNT</h1>
        <div className="login-line"></div>
        <span>Create your Khaadi account</span>
      </section>

      <section className="login-box">

        <div className="login-icon">
          <UserPlus size={34} strokeWidth={1.3} />
        </div>

        <h2>CREATE YOUR ACCOUNT</h2>

        <p className="login-text">
          Enter your details below to create your account.
        </p>

        <form onSubmit={handleRegister}>

          <div className="login-field">
            <label>FULL NAME</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-submit">
            CREATE ACCOUNT
            <ArrowRight size={17} strokeWidth={1.5} />
          </button>

        </form>

        <div className="login-bottom">
          <span>Already have an account?</span>
          <Link to="/login">LOGIN</Link>
        </div>

      </section>

    </div>
  );
}

export default Register;

