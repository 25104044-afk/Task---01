const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting - prevent brute force / abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Stricter limit on login/register
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes.",
  },
});

app.use("/api", limiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Employee Management System API is running 🚀",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      employees: "/api/employees",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📋 Health Check: http://localhost:${PORT}/\n`);
});

module.exports = app;
