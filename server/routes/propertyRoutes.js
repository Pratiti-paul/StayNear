import express from "express";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  verifyProperty,
  markFeatured,
} from "../controllers/propertyController.js";
import { protect, authorize } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Public routes
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

// Protected routes (Owner only)
router.post("/", protect, authorize("owner"), upload.array("images", 10), createProperty);
router.put("/:id", protect, authorize("owner"), upload.array("images", 10), updateProperty);

// Owner / Admin delete route
router.delete("/:id", protect, deleteProperty);

// Admin-only moderation routes
router.put("/:id/verify", protect, authorize("admin"), verifyProperty);
router.put("/:id/feature", protect, authorize("admin"), markFeatured);

export default router;
