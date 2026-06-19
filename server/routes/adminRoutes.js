import express from "express";
import {
  getStats,
  getAllUsers,
  getAllProperties,
  verifyProperty,
  deleteProperty,
  deleteUser,
  updateUserRole,
} from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Apply protection middleware to all admin routes
router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.get("/properties", getAllProperties);
router.put("/properties/:id/verify", verifyProperty);
router.delete("/properties/:id", deleteProperty);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/role", updateUserRole);

export default router;
