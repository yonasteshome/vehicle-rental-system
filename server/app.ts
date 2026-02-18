import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true               // 👈 REQUIRED for cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", require("./routes/vehicle.routes").default);
app.use("/api/bookings", require("./routes/booking.routes").default);
app.use("/api/payments", require("./routes/payment.routes").default);

export default app;
