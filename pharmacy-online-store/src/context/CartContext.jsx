import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [user, setUser] = useState(() => localStorage.getItem("user") || null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", user);
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const login = (username) => {
    setUser(username);
    localStorage.setItem("user", username); // persist login
  };

  const logout = () => {
    setUser(null);
    setCartItems([]);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  const addToCart = (product) => {
    if (!user) {
      // You can handle showing a message or redirecting to login here instead of alert
      return;
    }
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (product) => {
    const index = cartItems.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const updated = [...cartItems];
      updated.splice(index, 1);
      setCartItems(updated);
    }
  };

  return (
    <CartContext.Provider
      value={{
        user,
        login,
        logout,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
