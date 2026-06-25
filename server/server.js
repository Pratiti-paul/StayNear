import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
// Route imports
import authRoutes from "./routes/auth.js";
import pgRoutes from "./routes/pg.js";
import wishlistRoutes from "./routes/wishlist.js";
import inquiryRoutes from "./routes/inquiry.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();
const app = express();
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pgs", pgRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
