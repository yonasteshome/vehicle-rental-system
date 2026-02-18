import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import CarUser from "../models/user.model";
import Booking from "../models/booking.model";
import Payment from "../models/payment.model";

/* ================= TYPES ================= */
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "USER" | "ADMIN";
  };
}

/* ================= COOKIE ================= */
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/* ================= AUTH ================= */

export const signup = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUser(name, email, password);

    res
      .status(201)
      .cookie("access_token", result.token, cookieOptions)
      .json({
        success: true,
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
      });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res
      .status(200)
      .cookie("access_token", result.token, cookieOptions)
      .json({
        success: true,
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
      });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const logout = (_req: AuthRequest, res: Response) => {
  res.clearCookie("access_token").json({
    success: true,
    message: "Logged out successfully",
  });
};

/* ================= PROFILE ================= */

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  const user = await CarUser.findById(req.user!.id).select("-password");

  res.json({
    success: true,
    data: user,
  });
};

/* ================= ADMIN DASHBOARD / REVENUE ================= */

export const getAdminDashboard = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  const totalUsers = await CarUser.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const completedBookings = await Booking.countDocuments({
    status: "COMPLETED",
  });

  const revenueResult = await Payment.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$amount" },
      },
    },
  ]);

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  res.json({
    success: true,
    data: {
      totalUsers,
      totalBookings,
      completedBookings,
      totalRevenue,
    },
  });
};
