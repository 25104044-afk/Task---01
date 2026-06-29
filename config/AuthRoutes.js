const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  changePassword,
  logout,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../middleware/validate");

// Public routes
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Protected routes
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);
router.post("/logout", protect, logout);

module.exports = router;
