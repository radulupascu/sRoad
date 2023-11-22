import React, { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle the sign in logic here
    console.log("Email: ", email);
    console.log("Password: ", password);
    window.location.href="/"
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Enter your email and password to sign in</p>
        <form onSubmit={handleSignIn}>
        <div className="input-email">
            <label htmlFor="email">Email</label>
            <input className="input-email"
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-password">
            <label htmlFor="password">Password</label>
            <input
              className="input-password"
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="remember-me">
            <input id="remember-login" type="checkbox" />
            <label htmlFor="remember-login">Remember me</label>
          </div>
          <button type="submit" className="sign-up">Sign In</button>
        </form>
          <p>
            Don't have an account? <span className="sign-in">Sign Up</span>
          </p>
      </div>
    </div>
  );
}
