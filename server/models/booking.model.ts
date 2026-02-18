import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  vehicle: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
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
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
