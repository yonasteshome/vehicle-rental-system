import { Router } from "express";
import { getAdminStatsHandler } from "../controllers/report.controller";
import { protect } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/stats", protect, requireAdmin, getAdminStatsHandler);

export default router;
