import { Router } from "express";
import {
  createBookingHandler,
  getMyBookingsHandler,
  getAllBookingsHandler,
  cancelBookingHandler,
} from "../controllers/booking.controller";
import { protect } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

// USER
router.post("/", protect, createBookingHandler);
router.get("/my", protect, getMyBookingsHandler);

// ADMIN
router.get("/", protect, requireAdmin, getAllBookingsHandler);
router.put("/:id/cancel", protect, requireAdmin, cancelBookingHandler);

export default router;
