import { Request, Response } from "express";
import { getAdminStats } from "../services/report.service";

export const getAdminStatsHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const stats = await getAdminStats();
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
