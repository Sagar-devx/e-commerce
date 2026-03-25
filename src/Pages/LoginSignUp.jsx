import React, { useState } from "react";
import "./CSS/LoginSignUp.css";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SIGNUP
  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const user = {
      name: form.name,
      email: form.email,
      password: form.password
    };

    localStorage.setItem("userData", JSON.stringify(user));
    alert("Signup Successful!");

    setIsLogin(true); 
  };

  // LOGIN
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser) {
      alert("No user found! Please sign up first.");
      return;
    }

    if (form.email === storedUser.email && form.password === storedUser.password) {
      alert("Login Successful!");

      // 🔥 Notify navbar for UI update
      window.dispatchEvent(new Event("userLogin"));

    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">

        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        <div className="loginsignup-fields">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button onClick={isLogin ? handleLogin : handleSignup}>
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="loginsignup-login">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </p>

        {!isLogin && (
          <div className="loginsignup-agree">
            <input type="checkbox" />
            <p>I agree to the Terms & Privacy Policy.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoginSignUp;