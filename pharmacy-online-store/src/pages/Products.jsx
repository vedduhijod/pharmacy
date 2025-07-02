import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Paracetamol", price: 50 },
  { id: 2, name: "Ibuprofen", price: 70 },
  { id: 3, name: "Cough Syrup", price: 120 },
  { id: 4, name: "Vitamin Syrup", price: 150 },
  { id: 5, name: "Bandage", price: 30 },
  { id: 6, name: "Thermometer", price: 200 },
];

export default function Products() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const getQuantity = (productId) =>
    cartItems.filter((item) => item.id === productId).length;

  const handleAdd = (product) => {
    addToCart(product);
  };

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  return (
    <section className="bg-black text-white px-6 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Go to Cart button */}
        <div className="flex justify-end mb-6">
          <Link
            to="/checkout"
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded transition"
          >
            Go to Cart ({cartItems.length})
          </Link>
        </div>

        <h1 className="text-3xl mb-8">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => {
            const qty = getQuantity(p.id);

            return (
              <div key={p.id} className="bg-gray-800 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mb-4">₹{p.price}</p>

                {qty === 0 ? (
                  <button
                    onClick={() => handleAdd(p)}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleRemove(p)}
                      className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                    >
                      –
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => handleAdd(p)}
                      className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
