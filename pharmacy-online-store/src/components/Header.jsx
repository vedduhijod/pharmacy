import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { cartItems, user, logout } = useContext(CartContext);

  return (
    <header className="bg-white text-black px-6 py-4 flex justify-between items-center shadow ">
      <Link to="/" className="text-xl font-bold">
        Vimed
      </Link>
      <nav className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/products" className="hover:text-blue-400">
          Products
        </Link>
        <Link to="/upload" className="hover:text-blue-400">
          Upload
        </Link>
        <Link to="/checkout">
          <span className="mr-3 text-blue-400 text-2xl">🛒</span>(
          {cartItems.length})
        </Link>

        {user ? (
          <>
            <span>Hi, {user}</span>
            <button
              onClick={logout}
              className="ml-4 bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
