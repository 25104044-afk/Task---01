# 🏢 Employee Management System - Backend API

> **Prodigy Infotech Internship — Task 02**  
> Built with Node.js, Express.js, and MongoDB

---

## 📁 Project Structure

```
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
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd employee-management-backend
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/employee_management
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@company.com
ADMIN_PASSWORD=Admin@123456
```

### 3. Seed First Admin

```bash
node seed.js
```

### 4. (Optional) Add Sample Employees

```bash
node seed.js --employees
```

### 5. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

---

## 🔐 Authentication

All employee routes require a JWT token.

**Login → get token → send in header:**

```
Authorization: Bearer <your_token_here>
```

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new admin |
| POST | `/api/auth/login` | Public | Login & get token |
| GET | `/api/auth/me` | Private | Get logged-in admin |
| PUT | `/api/auth/change-password` | Private | Change password |
| POST | `/api/auth/logout` | Private | Logout |

---

### Employee Routes — `/api/employees`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/employees` | Admin | Get all employees (with filters) |
| POST | `/api/employees` | Admin | Create new employee |
| GET | `/api/employees/stats` | Admin | Get statistics & counts |
| GET | `/api/employees/:id` | Admin | Get employee by ID |
| PUT | `/api/employees/:id` | Admin | Update employee |
| DELETE | `/api/employees/:id` | Superadmin | Delete employee |

---

### Query Parameters for GET /api/employees

| Param | Example | Description |
|-------|---------|-------------|
| `page` | `?page=1` | Page number |
| `limit` | `?limit=10` | Results per page |
| `search` | `?search=Rahul` | Search name/email/ID |
| `department` | `?department=Engineering` | Filter by dept |
| `status` | `?status=Active` | Filter by status |
| `gender` | `?gender=Male` | Filter by gender |
| `sortBy` | `?sortBy=salary` | Sort field |
| `order` | `?order=asc` | asc or desc |

**Example:**
```
GET /api/employees?page=1&limit=5&department=Engineering&status=Active&sortBy=salary&order=desc
```

---

## 📝 Request Body Examples

### Register Admin
```json
POST /api/auth/register
{
  "name": "John Admin",
  "email": "john@company.com",
  "password": "Admin@1234"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "admin@company.com",
  "password": "Admin@123456"
}
```

### Create Employee
```json
POST /api/employees
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
```

### Update Employee
```json
PUT /api/employees/:id
Authorization: Bearer <token>

{
  "designation": "Senior Software Engineer",
  "salary": 100000,
  "status": "Active"
}
```

---

## 🏗️ Employee Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `employeeId` | String | Auto | EMP0001, EMP0002... |
| `firstName` | String | ✅ | |
| `lastName` | String | ✅ | |
| `email` | String | ✅ | Unique |
| `phone` | String | ✅ | 10-15 digits |
| `department` | Enum | ✅ | See list below |
| `designation` | String | ✅ | |
| `salary` | Number | ✅ | |
| `dateOfJoining` | Date | ✅ | |
| `dateOfBirth` | Date | ✅ | Min age 18 |
| `gender` | Enum | ✅ | |
| `address` | Object | ❌ | street, city, state, country, pincode |
| `status` | Enum | ❌ | Active (default), Inactive, On Leave, Terminated |

**Departments:** Engineering, Marketing, Sales, HR, Finance, Operations, Design, Legal, Support, Management

---

## 🔒 Security Features

- **JWT Authentication** — Stateless token-based auth
- **bcrypt Password Hashing** — 12 salt rounds
- **Rate Limiting** — 100 req/15min globally, 10 req/15min on auth
- **Input Validation** — All inputs validated with express-validator
- **Role-Based Access** — admin vs superadmin roles
- **CORS** — Configurable allowed origins
- **Password never returned** — `select: false` on password field

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |
| express-rate-limit | Rate limiting |
| cors | Cross-origin requests |
| morgan | Request logging |
| dotenv | Environment config |

---

## 👤 Author

**Your Name**  
Prodigy Infotech Intern
