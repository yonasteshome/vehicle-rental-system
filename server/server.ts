import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be the very first thing

import app from "./app";
import { connectDatabase } from "./config";

connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
