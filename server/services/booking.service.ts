import Booking from "../models/booking.model";
import Vehicle from "../models/vehicle.model";
import mongoose from "mongoose";

/* ================= CREATE BOOKING (USER) ================= */
export const createBooking = async (
  userId: string,
  data: {
    vehicleId: string;
    startDate: Date;
    endDate: Date;
  }
) => {
  const { vehicleId, startDate, endDate } = data;

  // 🔒 BLOCK duplicate active bookings
  const existingBooking = await Booking.findOne({
    user: userId,
    vehicle: vehicleId,
    status: { $in: ["PENDING", "CONFIRMED"] },
  });

  if (existingBooking) {
    throw new Error(
      `You already have an active booking (${existingBooking.status})`
    );
  }

  // 🚗 Check vehicle
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (!vehicle.available) {
    throw new Error("Vehicle is not available");
  }

  try {
    const booking = await Booking.create({
      user: new mongoose.Types.ObjectId(userId),
      vehicle: new mongoose.Types.ObjectId(vehicleId),
      startDate,
      endDate,
      status: "PENDING",
    });

    return booking;
  } catch (err: any) {
    // 🛡️ MongoDB race-condition protection
    if (err.code === 11000) {
      throw new Error("You already have an active booking for this vehicle");
    }
    throw err;
  }
};

/* ================= USER BOOKINGS ================= */
export const getUserBookings = async (userId: string) => {
  return Booking.find({ user: userId }).populate("vehicle");
};

/* ================= ADMIN BOOKINGS ================= */
export const getAllBookings = async () => {
  return Booking.find()
    .populate("vehicle")
    .populate("user", "name email role");
};

/* ================= ADMIN CONFIRM ================= */
export const confirmBooking = async (bookingId: string) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking ID");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status !== "PENDING") {
    throw new Error("Only pending bookings can be confirmed");
  }

  booking.status = "CONFIRMED";
  await booking.save();

  return booking;
};

/* ================= ADMIN CANCEL ================= */
export const cancelBooking = async (bookingId: string) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking ID");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status === "CANCELLED") {
    throw new Error("Booking is already cancelled");
  }

  booking.status = "CANCELLED";
  await booking.save();

  return booking;
};

/* ================= USER CANCEL OWN ================= */
export const cancelOwnBooking = async (
  bookingId: string,
  userId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking ID");
  }

  const booking = await Booking.findOne({
    _id: bookingId,
    user: userId,
  });

  if (!booking) {
    throw new Error("Booking not found or access denied");
  }

  if (booking.status !== "PENDING") {
    throw new Error(
      `Cannot cancel booking with status ${booking.status}`
    );
  }

  booking.status = "CANCELLED";
  await booking.save();

  return booking;
};