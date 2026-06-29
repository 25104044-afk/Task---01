/**
 * Seed Script - Creates the first superadmin account
 * Run: node seed.js
 */

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const Employee = require("./models/Employee");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
};

const seedAdmin = async () => {
  await connectDB();

  // Check if any admin exists
  const count = await Admin.countDocuments();
  if (count > 0) {
    console.log("⚠️  Admin already exists. Skipping seed.");
    process.exit(0);
  }

  const admin = await Admin.create({
    name: "Super Admin",
    email: process.env.ADMIN_EMAIL || "admin@company.com",
    password: process.env.ADMIN_PASSWORD || "Admin@123456",
    role: "superadmin",
  });

  console.log(`\n✅ Superadmin created successfully!`);
  console.log(`   Email   : ${admin.email}`);
  console.log(`   Password: ${process.env.ADMIN_PASSWORD || "Admin@123456"}`);
  console.log(`\n⚠️  Please change the password after first login!\n`);

  process.exit(0);
};

const seedSampleEmployees = async () => {
  await connectDB();

  const admin = await Admin.findOne({ role: "superadmin" });
  if (!admin) {
    console.log("❌ No admin found. Run: node seed.js first");
    process.exit(1);
  }

  const employees = [
    {
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul.sharma@company.com",
      phone: "9876543210",
      department: "Engineering",
      designation: "Software Engineer",
      salary: 85000,
      dateOfJoining: "2023-01-15",
      dateOfBirth: "1995-05-20",
      gender: "Male",
      address: { city: "Chennai", state: "Tamil Nadu", country: "India", pincode: "600001" },
      createdBy: admin._id,
    },
    {
      firstName: "Priya",
      lastName: "Nair",
      email: "priya.nair@company.com",
      phone: "9876543211",
      department: "HR",
      designation: "HR Manager",
      salary: 70000,
      dateOfJoining: "2022-06-01",
      dateOfBirth: "1990-09-12",
      gender: "Female",
      address: { city: "Mumbai", state: "Maharashtra", country: "India", pincode: "400001" },
      createdBy: admin._id,
    },
    {
      firstName: "Arjun",
      lastName: "Menon",
      email: "arjun.menon@company.com",
      phone: "9876543212",
      department: "Finance",
      designation: "Financial Analyst",
      salary: 75000,
      dateOfJoining: "2023-08-10",
      dateOfBirth: "1993-03-30",
      gender: "Male",
      address: { city: "Bangalore", state: "Karnataka", country: "India", pincode: "560001" },
      createdBy: admin._id,
    },
  ];

  await Employee.insertMany(employees);
  console.log(`✅ ${employees.length} sample employees added!`);
  process.exit(0);
};

// Run based on argument
const arg = process.argv[2];
if (arg === "--employees") {
  seedSampleEmployees().catch(console.error);
} else {
  seedAdmin().catch(console.error);
}
