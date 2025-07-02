import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Checkout() {
  const { cartItems, setCartItems, user } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [message, setMessage] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const productCounts = cartItems.reduce((acc, product) => {
    acc[product.id] = (acc[product.id] || 0) + 1;
    return acc;
  }, {});

  const uniqueProducts = Object.values(
    cartItems.reduce((acc, product) => {
      if (!acc[product.id]) acc[product.id] = product;
      return acc;
    }, {})
  );

  const subtotal = cartItems.reduce((sum, p) => sum + p.price, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;

  const increaseQuantity = (product) => {
    setCartItems([...cartItems, product]);
  };

  const decreaseQuantity = (product) => {
    const index = cartItems.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const updated = [...cartItems];
      updated.splice(index, 1);
      setCartItems(updated);
    }
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setMessage("Please enter a coupon code.");
      setDiscountPercent(0);
      return;
    }
    if (code === "SAVE10") {
      setDiscountPercent(10);
      setMessage("Coupon applied! 10% discount.");
    } else {
      setDiscountPercent(0);
      setMessage("Invalid coupon code.");
    }
  };

  const placeOrder = () => {
    setOrderMessage("");
    if (!user) {
      setOrderMessage("You must be logged in to place an order.");
      return;
    }
    if (cartItems.length === 0) {
      setOrderMessage("Your cart is empty.");
      return;
    }
    setOrderPlaced(true);
    setCartItems([]);
    setCoupon("");
    setDiscountPercent(0);
    setOrderMessage("");
  };

  return (
    <section className="bg-black min-h-screen text-white p-6 max-w-4xl mx-auto rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <FaShoppingCart size={30} className="mr-3 text-blue-400" />
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {orderPlaced ? (
        <p className="text-green-400 text-center text-2xl font-semibold py-20">
          🎉 Order placed successfully!
        </p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-400 text-center py-20">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6 mb-8">
            {uniqueProducts.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center bg-gray-900 p-4 rounded"
              >
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-400">Price: ₹{product.price}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => decreaseQuantity(product)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white transition"
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    −
                  </button>

                  <span className="text-white font-bold text-lg">
                    {productCounts[product.id]}
                  </span>

                  <button
                    onClick={() => increaseQuantity(product)}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white transition"
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 p-6 rounded space-y-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-grow p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                onClick={applyCoupon}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Apply
              </button>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-green-400 font-semibold">
                <span>Discount ({discountPercent}%):</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            {message && (
              <p
                className={`${
                  discountPercent > 0 ? "text-green-400" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <div className="flex justify-between text-2xl font-bold border-t border-gray-700 pt-3">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={!user || cartItems.length === 0}
              className={`w-full mt-4 py-3 rounded text-xl font-semibold transition
                ${
                  user && cartItems.length > 0
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-700 cursor-not-allowed"
                }
              `}
            >
              Place Order
            </button>

            {orderMessage && !orderPlaced && (
              <p
                className={`mt-4 text-center ${
                  orderMessage.includes("successfully")
                    ? "text-green-400"
                    : "text-red-500"
                } font-semibold`}
              >
                {orderMessage}
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
