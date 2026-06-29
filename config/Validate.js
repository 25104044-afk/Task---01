const { body, param, query, validationResult } = require("express-validator");

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Auth validations
const validateRegister = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase, one lowercase, and one number"),
  handleValidationErrors,
];

const validateLogin = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),
  body("password")
    .notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

// Employee validations
const validateCreateEmployee = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("First name is required")
    .isLength({ min: 2, max: 50 }).withMessage("First name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("First name can only contain letters"),
  body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is required")
    .isLength({ min: 2, max: 50 }).withMessage("Last name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Last name can only contain letters"),
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),
  body("phone")
    .notEmpty().withMessage("Phone number is required")
    .matches(/^[0-9]{10,15}$/).withMessage("Phone must be 10-15 digits"),
  body("department")
    .notEmpty().withMessage("Department is required")
    .isIn(["Engineering","Marketing","Sales","HR","Finance","Operations","Design","Legal","Support","Management"])
    .withMessage("Invalid department"),
  body("designation")
    .trim()
    .notEmpty().withMessage("Designation is required")
    .isLength({ max: 100 }).withMessage("Designation cannot exceed 100 characters"),
  body("salary")
    .notEmpty().withMessage("Salary is required")
    .isFloat({ min: 0 }).withMessage("Salary must be a positive number"),
  body("dateOfJoining")
    .notEmpty().withMessage("Date of joining is required")
    .isISO8601().withMessage("Invalid date format (use YYYY-MM-DD)"),
  body("dateOfBirth")
    .notEmpty().withMessage("Date of birth is required")
    .isISO8601().withMessage("Invalid date format (use YYYY-MM-DD)")
    .custom((value) => {
      const dob = new Date(value);
      const age = Math.floor((Date.now() - dob) / (365.25 * 24 * 60 * 60 * 1000));
      if (age < 18) throw new Error("Employee must be at least 18 years old");
      if (age > 80) throw new Error("Please enter a valid date of birth");
      return true;
    }),
  body("gender")
    .notEmpty().withMessage("Gender is required")
    .isIn(["Male","Female","Other","Prefer not to say"]).withMessage("Invalid gender value"),
  handleValidationErrors,
];

const validateUpdateEmployee = [
  param("id").isMongoId().withMessage("Invalid employee ID"),
  body("firstName")
    .optional().trim()
    .isLength({ min: 2, max: 50 }).withMessage("First name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("First name can only contain letters"),
  body("lastName")
    .optional().trim()
    .isLength({ min: 2, max: 50 }).withMessage("Last name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Last name can only contain letters"),
  body("email")
    .optional().trim()
    .isEmail().withMessage("Please enter a valid email"),
  body("phone")
    .optional()
    .matches(/^[0-9]{10,15}$/).withMessage("Phone must be 10-15 digits"),
  body("salary")
    .optional()
    .isFloat({ min: 0 }).withMessage("Salary must be a positive number"),
  body("status")
    .optional()
    .isIn(["Active","Inactive","On Leave","Terminated"]).withMessage("Invalid status"),
  handleValidationErrors,
];

const validateMongoId = [
  param("id").isMongoId().withMessage("Invalid ID format"),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateEmployee,
  validateUpdateEmployee,
  validateMongoId,
};
