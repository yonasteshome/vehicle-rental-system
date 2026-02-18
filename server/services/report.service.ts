import Payment from "../models/payment.model";
import Booking from "../models/booking.model";
import Vehicle from "../models/vehicle.model";
import carUser from "../models/user.model";

/* ================= ADMIN DASHBOARD STATS ================= */
export const getAdminStats = async () => {
  const totalRevenue = await Payment.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalBookings = await Booking.countDocuments();
  const totalVehicles = await Vehicle.countDocuments();
  const totalUsers = await carUser.countDocuments({ role: "USER" });

  return {
    totalRevenue: totalRevenue[0]?.total || 0,
    totalBookings,
    totalVehicles,
    totalUsers,
  };
};
