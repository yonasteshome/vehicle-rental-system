import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUser(name, email, password);

    res
      .status(201)
      .cookie("access_token", result.token, cookieOptions)
      .json({
        success: true,
        message: "User registered successfully",
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res
      .status(200)
      .cookie("access_token", result.token, cookieOptions)
      .json({
        success: true,
        message: "Login successful",
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

export const logout = (_req: Request, res: Response) => {
  res
    .clearCookie("access_token")
    .json({ success: true, message: "Logged out successfully" });
};
