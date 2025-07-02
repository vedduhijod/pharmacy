import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          name: username.trim(), // ✅ correct key
          email: email.trim(),
          password: password.trim(),
        }
      );

      localStorage.setItem("token", res.data.token);
      login(username.trim());
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register for Vimed
        </h2>
        {error && (
          <p className="bg-red-600 text-white p-2 mb-4 rounded text-center">
            {error}
          </p>
        )}
        <label className="block mb-4">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700"
          />
        </label>
        <label className="block mb-4">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700"
          />
        </label>
        <label className="block mb-6">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
}
