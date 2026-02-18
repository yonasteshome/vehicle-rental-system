import { Router } from "express";
import {
  createBookingHandler,
  getMyBookingsHandler,
  getAllBookingsHandler,
  cancelBookingHandler,
  confirmBookingHandler,
  cancelMyBookingHandler,
} from "../controllers/booking.controller";
import { protect } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

/* USER */
router.post("/", protect, createBookingHandler);
router.get("/my", protect, getMyBookingsHandler);
router.put("/my/:id/cancel", protect, cancelMyBookingHandler);

/* ADMIN */
router.get("/", protect, requireAdmin, getAllBookingsHandler);
router.put("/:id/confirm", protect, requireAdmin, confirmBookingHandler);
router.put("/:id/cancel", protect, requireAdmin, cancelBookingHandler);

export default router;
