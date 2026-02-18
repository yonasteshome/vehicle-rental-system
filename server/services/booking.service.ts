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
  const vehicle = await Vehicle.findById(data.vehicleId);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (!vehicle.available) {
    throw new Error("Vehicle is not available");
  }

  const booking = await Booking.create({
    user: userId, // 👉 references carUser
    vehicle: data.vehicleId,
    startDate: data.startDate,
    endDate: data.endDate,
    status: "PENDING",
  });

  return booking;
};

/* ================= USER BOOKINGS ================= */
export const getUserBookings = async (userId: string) => {
  return Booking.find({ user: userId })
    .populate("vehicle");
};

/* ================= ADMIN BOOKINGS ================= */
export const getAllBookings = async () => {
  return Booking.find()
    .populate({
      path: "user",
      model: "carUser", // ✅ IMPORTANT FIX
      select: "name email role",
    })
    .populate("vehicle");
};

/* ================= ADMIN CONFIRM ================= */
export const confirmBooking = async (bookingId: string) => {
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
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
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
    throw new Error("Only pending bookings can be cancelled");
  }

  booking.status = "CANCELLED";
  await booking.save();

  return booking;
};
