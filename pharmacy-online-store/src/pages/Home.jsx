import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Paracetamol", category: "Tablet", price: 50 },
  { id: 2, name: "Ibuprofen", category: "Tablet", price: 70 },
  { id: 3, name: "Cough Syrup", category: "Syrup", price: 120 },
  { id: 4, name: "Vitamin Syrup", category: "Syrup", price: 150 },
  { id: 5, name: "Bandage", category: "Others", price: 30 },
  { id: 6, name: "Thermometer", category: "Others", price: 200 },
];

export default function Home() {
  const tablets = products.filter((p) => p.category === "Tablet").slice(0, 2);
  const syrups = products.filter((p) => p.category === "Syrup").slice(0, 2);
  const others = products.filter((p) => p.category === "Others").slice(0, 2);

  const renderProducts = (items) =>
    items.map((p) => (
      <div
        key={p.id}
        className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700 transition"
      >
        <h3 className="font-semibold">{p.name}</h3>
        <p className="text-gray-300">₹{p.price}</p>
      </div>
    ));

  return (
    <section className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Title & CTA */}
        <h1 className="text-4xl font-bold mb-4">Welcome to Vimed</h1>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Vimed is your trusted online medical partner for all your healthcare
          needs. From daily medicines to specialized care, we deliver 100%
          genuine products, verified prescriptions, and peace of mind — right at
          your doorstep.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <Link
            to="/upload"
            className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 text-center"
          >
            Upload Prescription
          </Link>
          <Link
            to="/products"
            className="bg-gray-800 px-6 py-3 rounded hover:bg-gray-700 text-center"
          >
            View All Products
          </Link>
        </div>

        {/* Info Section */}
        <div className="bg-gray-900 p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Why Vimed?</h2>
          <p className="text-gray-400 mb-4">
            Upload your prescription in seconds — our licensed pharmacists
            verify it, ensuring you get exactly what you need, safely. Shop
            genuine tablets, syrups, medical devices and wellness essentials
            with unbeatable convenience.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>
              100% authentic medicines sourced directly from trusted suppliers.
            </li>
            <li>Fast & safe delivery, all over the country.</li>
            <li>24/7 order support and friendly service.</li>
            <li>Exclusive discounts and verified coupons.</li>
          </ul>
        </div>
        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 mt-12">
          {/* Tablets */}
          <div>
            <h2>           </h2>
            <h2 className="text-2xl font-bold mb-4">Tablets</h2>
            <div className="space-y-4">{renderProducts(tablets)}</div>
            <Link
              to="/products"
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              View More Tablets
            </Link>
          </div>

          {/* Syrups */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Syrups</h2>
            <div className="space-y-4">{renderProducts(syrups)}</div>
            <Link
              to="/products"
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              View More Syrups
            </Link>
          </div>

          {/* Others */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Others</h2>
            <div className="space-y-4">{renderProducts(others)}</div>
            <Link
              to="/products"
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              View More Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
