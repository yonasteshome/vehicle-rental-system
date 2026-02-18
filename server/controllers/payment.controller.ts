import { Request, Response } from "express";
import {
  createPayment,
  getMyPayments,
  getAllPayments,
} from "../services/payment.service";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

/* ================= CREATE PAYMENT (USER) ================= */
export const createPaymentHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const payment = await createPayment(req.user!.id, req.body);

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= USER PAYMENTS ================= */
export const getMyPaymentsHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const payments = await getMyPayments(req.user!.id);

    res.json({
      success: true,
      data: payments,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= ADMIN PAYMENTS ================= */
export const getAllPaymentsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const payments = await getAllPayments();

    res.json({
      success: true,
      data: payments,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
