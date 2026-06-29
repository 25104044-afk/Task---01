const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Send token response
const sendTokenResponse = (admin, statusCode, res, message = "Success") => {
  const token = generateToken(admin._id, admin.role);

  res.status(statusCode).json({
    success: true,
    message,
    token,
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
};

module.exports = { generateToken, sendTokenResponse };
