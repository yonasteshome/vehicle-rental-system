import { Router } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller";

import { protect } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import {
  createVehicleSchema,
  updateVehicleSchema,
} from "../validations/vehicle.validation";

const router = Router();

// public
router.get("/", getVehicles);

// admin only
router.post(
  "/",
  protect,
  requireAdmin,
  createVehicle
);

router.get("/:id", protect, requireAdmin, getVehicleById);

router.put(
  "/:id",
  protect,
  requireAdmin,
  updateVehicle
);

router.delete("/:id", protect, requireAdmin, deleteVehicle);

export default router;
