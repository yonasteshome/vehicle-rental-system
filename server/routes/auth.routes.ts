import { Router } from "express";
import {
  signup,
  login,
  logout,
  getMyProfile,
  getAdminDashboard,
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/* ================= AUTH ================= */
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

/* ================= USER ================= */
router.get("/me", protect, getMyProfile);

/* ================= ADMIN ================= */
router.get("/admin/dashboard", protect, getAdminDashboard);

export default router;
