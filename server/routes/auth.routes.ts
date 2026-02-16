import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protect, logout);

export default router;
