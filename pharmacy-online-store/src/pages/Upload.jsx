import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    if (file && name && phone && address) {
      setSuccess(true);
      setError("");
      setFile(null);
      setName("");
      setPhone("");
      setAddress("");
    } else {
      setError("Please fill all fields and upload your prescription.");
      setSuccess(false);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center px-4 py-20">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Upload Your Prescription</h2>
        <p className="text-gray-400 mb-6">
          Please fill in your details and upload your valid prescription. Our
          licensed pharmacists will verify it securely.
        </p>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
          />
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload Prescription
          </button>

          {success && (
            <p className="mt-4 text-green-500">
              Prescription uploaded successfully! Our team will reach out
              shortly.
            </p>
          )}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      </div>
    </section>
  );
}
