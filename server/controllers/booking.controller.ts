import { Request, Response } from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  confirmBooking,
  cancelOwnBooking,
} from "../services/booking.service";

interface AuthRequest extends Request {
  user?: any;
}

/* ================= USER CREATE ================= */
export const createBookingHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const booking = await createBooking(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ================= USER BOOKINGS ================= */
export const getMyBookingsHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const bookings = await getUserBookings(req.user.id);
  res.json({ success: true, data: bookings });
};

/* ================= ADMIN BOOKINGS ================= */
export const getAllBookingsHandler = async (
  req: Request,
  res: Response
) => {
  const bookings = await getAllBookings();
  res.json({ success: true, data: bookings });
};

/* ================= ADMIN CONFIRM ================= */
export const confirmBookingHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await confirmBooking(id);
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ================= ADMIN CANCEL ================= */
export const cancelBookingHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await cancelBooking(id);
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const cancelMyBookingHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const idParam = req.params.id;

    // 🔒 Type guard
    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await cancelOwnBooking(idParam, req.user.id);

    res.json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

