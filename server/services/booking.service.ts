import Booking from "../models/booking.model";
import Vehicle from "../models/vehicle.model";
import { CreateBookingInput } from "../types/booking.types";

export const createBooking = async (
  userId: string,
  data: CreateBookingInput
) => {
  const vehicle = await Vehicle.findById(data.vehicleId);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (!vehicle.available) {
    throw new Error("Vehicle is not available");
  }

  const booking = await Booking.create({
    user: userId,
    vehicle: data.vehicleId,
    startDate: data.startDate,
    endDate: data.endDate,
  });

  // make vehicle unavailable
  vehicle.available = false;
  await vehicle.save();

  return booking;
};

export const getUserBookings = async (userId: string) => {
  return Booking.find({ user: userId }).populate("vehicle");
};

export const getAllBookings = async () => {
  return Booking.find().populate("user vehicle");
};

export const cancelBooking = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = "CANCELLED";
  await booking.save();

  // make vehicle available again
  await Vehicle.findByIdAndUpdate(booking.vehicle, {
    available: true,
  });

  return booking;
};
