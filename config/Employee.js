const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      // Auto-generated in pre-save hook
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: [
        "Engineering",
        "Marketing",
        "Sales",
        "HR",
        "Finance",
        "Operations",
        "Design",
        "Legal",
        "Support",
        "Management",
      ],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      maxlength: [100, "Designation cannot exceed 100 characters"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },
    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required"],
      default: Date.now,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other", "Prefer not to say"],
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
      pincode: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave", "Terminated"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: full name
employeeSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Auto-generate employeeId before saving
employeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await mongoose.model("Employee").countDocuments();
    this.employeeId = `EMP${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

// Index for faster search
employeeSchema.index({ email: 1 });
employeeSchema.index({ department: 1 });
employeeSchema.index({ status: 1 });
employeeSchema.index({ firstName: "text", lastName: "text", email: "text" });

module.exports = mongoose.model("Employee", employeeSchema);
