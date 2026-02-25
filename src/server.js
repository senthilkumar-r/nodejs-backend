import express from "express";
import { config } from "dotenv";

import { connectDB, disconnectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoute.js";

config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  server.close(() => {
    disconnectDB().then(() => {
      process.exit(1); // Exit the process with an error code
    });
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  server.close(() => {
    disconnectDB().then(() => {
      process.exit(1); // Exit the process with an error code
    });
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  server.close(() => {
    disconnectDB().then(() => {
      process.exit(0); // Exit the process with a success code
    });
  });
});
