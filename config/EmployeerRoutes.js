const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
} = require("../controllers/employeeController");

const { protect, authorize } = require("../middleware/auth");
const {
  validateCreateEmployee,
  validateUpdateEmployee,
  validateMongoId,
} = require("../middleware/validate");

// All routes are protected (require login)
router.use(protect);

// Stats route (before /:id to avoid conflict)
router.get("/stats", getEmployeeStats);

// CRUD routes
router
  .route("/")
  .get(getAllEmployees)              // GET  /api/employees
  .post(validateCreateEmployee, createEmployee); // POST /api/employees

router
  .route("/:id")
  .get(validateMongoId, getEmployeeById)              // GET    /api/employees/:id
  .put(validateUpdateEmployee, updateEmployee)         // PUT    /api/employees/:id
  .delete(validateMongoId, authorize("superadmin"), deleteEmployee); // DELETE /api/employees/:id (superadmin only)

module.exports = router;
