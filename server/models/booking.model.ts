import mongoose, { Schema, Document } from "mongoose";
import { BookingStatus } from "../types/booking.types";

export interface BookingDocument extends Document {
  user: mongoose.Types.ObjectId;
  vehicle: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
}

const bookingSchema = new Schema<BookingDocument>(
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
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model<BookingDocument>("Booking", bookingSchema);
