import { Schema, model, Document, Types } from "mongoose";

export interface IPayment extends Document {
  user: Types.ObjectId;
  booking: Types.ObjectId;
  amount: number;
  method: "CASH" | "CARD" | "MOBILE";
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "carUser",
      required: true,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true, // one payment per booking
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["CASH", "CARD", "MOBILE"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default model<IPayment>("Payment", paymentSchema);
