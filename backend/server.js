require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registrationRoutes = require("./routes/registration");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cipherclash";
app.get("/", (req, res) => {
  res.json({ status: "CipherClash API running", timestamp: new Date() });
})
// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", registrationRoutes);

// Health check
;

// Connect to MongoDB and start server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    startServer();
  })
  .catch((err) => {
    console.error("\n❌ MongoDB connection error:", err.message);
    console.error("CRITICAL: Application requires a database connection to function correctly.");
    process.exit(1);
  });
