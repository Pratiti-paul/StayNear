import express from "express";
import {
  getInquiries,
  createInquiry,
  updateInquiryStatus,
} from "../controllers/inquiryController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getInquiries);
router.post("/", createInquiry);
router.patch("/:id", updateInquiryStatus);

export default router;
