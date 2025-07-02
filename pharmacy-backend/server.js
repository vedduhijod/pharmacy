import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"; // ✅ ADD THIS
import orderRoutes from "./routes/orderRoutes.js"; // ✅ ADD THIS
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // ✅ ADD THIS
app.use("/api/orders", orderRoutes); // ✅ ADD THIS

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
