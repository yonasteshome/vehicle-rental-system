import { Schema, model, Document } from "mongoose";

export interface IVehicle extends Document {
  name: string;
  type: string;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },

    available: {
      type: Boolean,
      default: true,
    },

    imageUrl: {
      type: String,
      required: true, // force image on insert
      trim: true,
    },
  },
  { timestamps: true }
);

export default model<IVehicle>("Vehicle", vehicleSchema);