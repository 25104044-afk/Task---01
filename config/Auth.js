const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Protect routes - verify JWT
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid. User no longer exists.",
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Token is invalid or expired.",
    });
  }
};

// Authorize roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.admin.role}' is not authorized to access this route.`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
