🏢 Employee Management System - Backend API

Prodigy Infotech Internship — Task 02

Built with Node.js, Express.js, and MongoDB

 Project Structure

employee-management-backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Register, Login, Me, Logout
│   └── employeeController.js  # CRUD + Stats
├── middleware/
│   ├── auth.js                # JWT protect + role authorize
│   ├── errorHandler.js        # Global error handler
│   └── validate.js            # express-validator rules
├── models/
│   ├── Admin.js               # Admin/User schema
│   └── Employee.js            # Employee schema
├── routes/
│   ├── authRoutes.js          # /api/auth/*
│   └── employeeRoutes.js      # /api/employees/*
├── utils/
│   └── generateToken.js       # JWT token helper
├── .env.example
├── .gitignore
├── package.json
├── seed.js                    # Seed admin + sample data
└── server.js                  # Entry point


 Getting Started

1. Clone & Install

bashgit clone <your-repo-url>
cd employee-management-backend
npm install

2. Setup Environment

bashcp .env.example .env

Edit .env:

envPORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/employee_management
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@company.com
ADMIN_PASSWORD=Admin@123456

3. Seed First Admin

bashnode seed.js

4. (Optional) Add Sample Employees

bashnode seed.js --employees

5. Start Server

bash# Development (with auto-reload)
npm run dev

# Production
npm start


🔐 Authentication

All employee routes require a JWT token.

Login → get token → send in header:

Authorization: Bearer <your_token_here>


📡 API Endpoints

Auth Routes — /api/auth

MethodEndpointAccessDescriptionPOST/api/auth/registerPublicRegister new adminPOST/api/auth/loginPublicLogin & get tokenGET/api/auth/mePrivateGet logged-in adminPUT/api/auth/change-passwordPrivateChange passwordPOST/api/auth/logoutPrivateLogout


Employee Routes — /api/employees

MethodEndpointAccessDescriptionGET/api/employeesAdminGet all employees (with filters)POST/api/employeesAdminCreate new employeeGET/api/employees/statsAdminGet statistics & countsGET/api/employees/:idAdminGet employee by IDPUT/api/employees/:idAdminUpdate employeeDELETE/api/employees/:idSuperadminDelete employee


Query Parameters for GET /api/employees

ParamExampleDescriptionpage?page=1Page numberlimit?limit=10Results per pagesearch?search=RahulSearch name/email/IDdepartment?department=EngineeringFilter by deptstatus?status=ActiveFilter by statusgender?gender=MaleFilter by gendersortBy?sortBy=salarySort fieldorder?order=ascasc or desc

Example:

GET /api/employees?page=1&limit=5&department=Engineering&status=Active&sortBy=salary&order=desc


📝 Request Body Examples

Register Admin

jsonPOST /api/auth/register
{
  "name": "John Admin",
  "email": "john@company.com",
  "password": "Admin@1234"
}

Login

jsonPOST /api/auth/login
{
  "email": "admin@company.com",
  "password": "Admin@123456"
}

Create Employee

jsonPOST /api/employees
Authorization: Bearer <token>

{
  "firstName": "Rahul",
  "lastName": "Sharma",
  "email": "rahul@company.com",
  "phone": "9876543210",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": 85000,
  "dateOfJoining": "2024-01-15",
  "dateOfBirth": "1995-05-20",
  "gender": "Male",
  "address": {
    "street": "123 Main St",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "country": "India",
    "pincode": "600001"
  }
}

Update Employee

jsonPUT /api/employees/:id
Authorization: Bearer <token>

{
  "designation": "Senior Software Engineer",
  "salary": 100000,
  "status": "Active"
}


🏗️ Employee Fields

FieldTypeRequiredNotesemployeeIdStringAutoEMP0001, EMP0002...firstNameString✅lastNameString✅emailString✅UniquephoneString✅10-15 digitsdepartmentEnum✅See list belowdesignationString✅salaryNumber✅dateOfJoiningDate✅dateOfBirthDate✅Min age 18genderEnum✅addressObject❌street, city, state, country, pincodestatusEnum❌Active (default), Inactive, On Leave, Terminated

Departments: Engineering, Marketing, Sales, HR, Finance, Operations, Design, Legal, Support, Management


🔒 Security Features


JWT Authentication — Stateless token-based auth
bcrypt Password Hashing — 12 salt rounds
Rate Limiting — 100 req/15min globally, 10 req/15min on auth
Input Validation — All inputs validated with express-validator
Role-Based Access — admin vs superadmin roles
CORS — Configurable allowed origins
Password never returned — select: false on password field



🛠️ Tech Stack

TechnologyPurposeNode.jsRuntimeExpress.jsWeb frameworkMongoDBDatabaseMongooseODMJWTAuthenticationbcryptjsPassword hashingexpress-validatorInput validationexpress-rate-limitRate limitingcorsCross-origin requestsmorganRequest loggingdotenvEnvironment config


👤 Author

Your Name

Prodigy Infotech Internship — Task 02
