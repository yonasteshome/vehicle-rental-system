import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  vehicle: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 🚨 CRITICAL INDEX (DO NOT SKIP)
 * Prevents duplicate active bookings (PENDING / CONFIRMED)
 */
bookingSchema.index(
  { user: 1, vehicle: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["PENDING", "CONFIRMED"] },
    },
  }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;