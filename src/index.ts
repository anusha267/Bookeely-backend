import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import logRoutes from "./routes/logRoutes";
import { neon } from "@neondatabase/serverless";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Initialize Neon SQL client
const sql = neon(process.env.DATABASE_URL || "");

// Test route to check database connection
app.get("/v1/version", async (req, res) => {
  try {
    const result = await sql(`SELECT version()`);
    const { version } = result[0];
    res.status(200).json({ version });
  } catch (error) {
    console.error("Database query error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch version from the database" });
  }
});

// Define your routes
app.use("/v1/auth", authRoutes);
app.use("/v1/books", bookRoutes);
app.use("/v1/logs", logRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
