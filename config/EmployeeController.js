const Employee = require("../models/Employee");

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private (Admin)
const createEmployee = async (req, res, next) => {
  try {
    req.body.createdBy = req.admin._id;

    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all employees with search, filter, pagination
// @route   GET /api/employees
// @access  Private (Admin)
const getAllEmployees = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      department,
      status,
      gender,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // Build filter query
    const filter = {};

    if (department) filter.department = department;
    if (status) filter.status = status;
    if (gender) filter.gender = gender;

    // Search by name or email
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortOrder = order === "asc" ? 1 : -1;

    const [employees, total] = await Promise.all([
      Employee.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(Number(limit))
        .populate("createdBy", "name email")
        .populate("updatedBy", "name email"),
      Employee.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      count: employees.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single employee by ID
// @route   GET /api/employees/:id
// @access  Private (Admin)
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Private (Admin)
const updateEmployee = async (req, res, next) => {
  try {
    req.body.updatedBy = req.admin._id;

    // Don't allow employeeId to be changed
    delete req.body.employeeId;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private (Admin)
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Employee '${employee.fullName}' (${employee.employeeId}) deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employees count and stats per department
// @route   GET /api/employees/stats
// @access  Private (Admin)
const getEmployeeStats = async (req, res, next) => {
  try {
    const [
      totalEmployees,
      activeEmployees,
      departmentStats,
      statusStats,
      genderStats,
    ] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: "Active" }),
      Employee.aggregate([
        { $group: { _id: "$department", count: { $sum: 1 }, avgSalary: { $avg: "$salary" } } },
        { $sort: { count: -1 } },
      ]),
      Employee.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Employee.aggregate([
        { $group: { _id: "$gender", count: { $sum: 1 } } },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees: totalEmployees - activeEmployees,
        departmentStats,
        statusStats,
        genderStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
};
