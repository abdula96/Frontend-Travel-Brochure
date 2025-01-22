import React, { useState, useEffect } from "react";
import { loginUser, registerUser, requestPasswordReset } from "../apiService";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for showing password

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await loginUser({ email, password })
        : await registerUser({ name, email, password });
      localStorage.setItem("token", response.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setError(
        `Error ${isLogin ? "logging in" : "registering"}: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const handleResetPasswordRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(resetEmail);
      setResetMessage(response.message);
    } catch (error) {
      setResetMessage("Error sending password reset link.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showResetForm ? (
        <div>
          <h2>Reset Password</h2>
          <form onSubmit={handleResetPasswordRequest}>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button type="submit">Send Reset Link</button>
          </form>
          {resetMessage && <p>{resetMessage}</p>}
          <button onClick={() => setShowResetForm(false)}>Back to Login</button>
        </div>
      ) : (
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
      )}
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
      {isLogin && !showResetForm && (
        <button onClick={() => setShowResetForm(true)}>Forgot Password?</button>
      )}
    </div>
  );
};

export default AuthPage;
