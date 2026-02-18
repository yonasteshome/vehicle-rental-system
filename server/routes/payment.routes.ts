import { Router } from "express";
import {
  createPaymentHandler,
  getMyPaymentsHandler,
  getAllPaymentsHandler,
} from "../controllers/payment.controller";
import { protect } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

// USER
router.post("/", protect, createPaymentHandler);
router.get("/my", protect, getMyPaymentsHandler);

// ADMIN
router.get("/", protect, requireAdmin, getAllPaymentsHandler);

export default router;
