
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    alert("Login successful!");

    navigate("/account");
  };

  return (
    <div className="login-page">

      <section className="login-header">
        <p>WELCOME BACK</p>
        <h1>LOGIN</h1>
        <div className="login-line"></div>
        <span>Sign in to your Khaadi account</span>
      </section>

      <section className="login-box">

        <div className="login-icon">
          <LogIn size={34} strokeWidth={1.3} />
        </div>

        <h2>WELCOME BACK</h2>

        <p className="login-text">
          Enter your details below to access your account.
        </p>

        <form onSubmit={handleLogin}>

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-submit">
            LOGIN
            <ArrowRight size={17} strokeWidth={1.5} />
          </button>

        </form>

        <div className="login-bottom">
          <span>Don't have an account?</span>
          <Link to="/register">CREATE ACCOUNT</Link>
        </div>

      </section>

    </div>
  );
}

export default Login;

