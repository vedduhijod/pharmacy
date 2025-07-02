import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">
            Vimed Medical Shop
          </h3>
          <p>
            Certified medicines, health & wellness, trusted by thousands. 24/7
            support.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Contact</h3>
          <p>123 Health Street, Your City</p>
          <p>support@vimed.com</p>
          <p>+91 98765 43210</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="/upload" className="hover:underline">
                Upload Prescription
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-6">
        © 2024 Vimed. All rights reserved.
      </div>
    </footer>
  );
}
