import { Request, Response } from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
} from "../services/booking.service";

interface AuthRequest extends Request {
  user?: any;
}

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

export const getMyBookingsHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const bookings = await getUserBookings(req.user.id);

  res.json({ success: true, data: bookings });
};

export const getAllBookingsHandler = async (
  req: Request,
  res: Response
) => {
  const bookings = await getAllBookings();
  res.json({ success: true, data: bookings });
};

export const cancelBookingHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const idParam = req.params.id;

    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking: any = await cancelBooking(idParam);

    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};


