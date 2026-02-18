import Payment from "../models/payment.model";
import Booking from "../models/booking.model";

/* ================= CREATE PAYMENT ================= */
export const createPayment = async (
  userId: string,
  data: {
    bookingId: string;
    method: "CASH" | "CARD" | "MOBILE";
  }
) => {
  const booking = await Booking.findById(data.bookingId).populate("vehicle");

  if (!booking) {
    throw new Error("Booking not found");
  }

  // ownership check (safe)
  const bookingUserId =
    typeof booking.user === "string"
      ? booking.user
      : booking.user.toString();

  if (bookingUserId !== userId) {
    throw new Error("Unauthorized payment attempt");
  }

  // only CONFIRMED bookings can be paid
  if (booking.status !== "CONFIRMED") {
    throw new Error("Only confirmed bookings can be paid");
  }

  // prevent duplicate payment
  const existingPayment = await Payment.findOne({
    booking: booking._id,
    status: "SUCCESS",
  });

  if (existingPayment) {
    throw new Error("Payment already completed for this booking");
  }

  const vehicle: any = booking.vehicle;

  if (!vehicle) {
    throw new Error("Vehicle not found for booking");
  }

  // calculate rental days
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);

  const diffInMs = end.getTime() - start.getTime();
  const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    throw new Error("Invalid booking dates");
  }

  const amount = days * vehicle.pricePerDay;

  const payment = await Payment.create({
    user: userId,
    booking: booking._id,
    amount,
    method: data.method,
    status: "SUCCESS",
  });

  return payment;
};

/* ================= USER PAYMENTS ================= */
export const getMyPayments = async (userId: string) => {
  return Payment.find({ user: userId })
    .populate({
      path: "booking",
      populate: { path: "vehicle" },
    })
    .sort({ createdAt: -1 });
};

/* ================= ADMIN PAYMENTS ================= */
export const getAllPayments = async () => {
  return Payment.find()
    .populate("user", "name email")
    .populate({
      path: "booking",
      populate: { path: "vehicle" },
    })
    .sort({ createdAt: -1 });
};
