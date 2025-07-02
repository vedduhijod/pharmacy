import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(CartContext);
  const navigate = useNavigate();



const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!username.trim() || !password.trim()) {
    setError("Please enter both email and password.");
    return;
  }

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      email: username.trim(), // ✅ real email
      password: password.trim(),
    });

    localStorage.setItem("token", res.data.token);

    login(username.trim());
    navigate("/");
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Login failed. Please try again.");
  }
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Vimed</h2>
        {error && (
          <p className="bg-red-600 text-white p-2 mb-4 rounded text-center">
            {error}
          </p>
        )}
        <label className="block mb-4">
          Email
          <input
            type="email"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
          />
        </label>
        <label className="block mb-6">
          Password
          <input
            type="password"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </section>
  );
}
