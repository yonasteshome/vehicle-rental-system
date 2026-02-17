import { Request, Response } from "express";
import Vehicle from "../models/vehicle.model";
import {
  CreateVehicleInput,
  UpdateVehicleInput,
} from "../types/vehicle.types";

/**
 * ADMIN: Create vehicle
 */
export const createVehicle = async (
  req: Request<{}, {}, CreateVehicleInput>,
  res: Response
) => {
  const vehicle = await Vehicle.create(req.body);

  res.status(201).json({
    success: true,
    data: vehicle,
  });
};

/**
 * PUBLIC: Get all vehicles
 */
export const getVehicles = async (_req: Request, res: Response) => {
  const vehicles = await Vehicle.find();

  res.json({
    success: true,
    data: vehicles,
  });
};

/**
 * ADMIN: Get vehicle by ID
 */
export const getVehicleById = async (req: Request, res: Response) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  }

  res.json({
    success: true,
    data: vehicle,
  });
};

/**
 * ADMIN: Update vehicle
 */
export const updateVehicle = async (
  req: Request<{ id: string }, {}, UpdateVehicleInput>,
  res: Response
) => {
  const vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  }

  res.json({
    success: true,
    data: vehicle,
  });
};

/**
 * ADMIN: Delete vehicle
 */
export const deleteVehicle = async (req: Request, res: Response) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  }

  res.json({
    success: true,
    message: "Vehicle deleted successfully",
  });
};
