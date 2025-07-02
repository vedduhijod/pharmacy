import React from "react";

export default function ProductCard({
  product,
  addToCart,
  removeFromCart,
  count,
}) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 hover:shadow transition flex flex-col bg-gray-800">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-contain mb-4 rounded"
      />
      <h3 className="text-lg font-bold mb-1 text-white">{product.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{product.description}</p>
      <span className="text-blue-400 font-semibold mb-2">₹{product.price}</span>
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
        {count > 0 && (
          <button
            onClick={() => removeFromCart(product)}
            className="border border-blue-600 text-blue-400 px-4 py-2 rounded hover:bg-blue-800"
          >
            Remove ({count})
          </button>
        )}
      </div>
    </div>
  );
}
