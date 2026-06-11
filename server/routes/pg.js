import express from "express";
import {
  getAllPGs,
  getPGById,
  createPG,
  updatePG,
  deletePG,
  searchPGs,
} from "../controllers/pgController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPGs);
router.get("/search", searchPGs);
router.get("/:id", getPGById);

router.post("/", protect, authorize("owner"), createPG);
router.patch("/:id", protect, authorize("owner"), updatePG);
router.delete("/:id", protect, authorize("owner"), deletePG);

export default router;
