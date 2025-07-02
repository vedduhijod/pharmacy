import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Upload from "./pages/Upload";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import { CartProvider, CartContext } from "./context/CartContext";
import Register from "./pages/Register";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <CartProvider>
      <CartContext.Consumer>
        {({ cartItems }) => (
          <Router>
            <div className="flex flex-col min-h-screen bg-black text-white">
              <Header
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
                cartCount={cartItems.length}
              />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/products"
                    element={<Products loggedInUser={loggedInUser} />}
                  />
                  <Route path="/upload" element={<Upload />} />
                  <Route
                    path="/checkout"
                    element={<Checkout loggedInUser={loggedInUser} />}
                  />
                  <Route
                    path="/login"
                    element={<Login setLoggedInUser={setLoggedInUser} />}
                  />
                  <Route path="/register" 
                         element={<Register />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        )}
      </CartContext.Consumer>
    </CartProvider>
  );
}
