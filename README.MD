Tak-02: Employee Management System

##Prodigy Infotech Pvt Lmt.,

 Overview:

    The Employee Management System is a full-stack web application developed to simplify employee record management within an organization. This project allows administrators to securely manage employee information through a user-friendly interface with authentication and complete CRUD (Create, Read, Update, Delete) operations.The application is built using modern web technologies including HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB. It demonstrates full-stack development concepts such as REST APIs, database integration, authentication, validation, and secure data handling.This project was developed as part of my internship to gain practical experience in backend development, database management, API development, and GitHub collaboration.

Features:

- User Authentication (Admin Login)
- Secure Password Hashing using bcrypt
- JWT Authentication
- Add New Employee
- View Employee Details
- Update Employee Information
- Delete Employee Records
- Employee Search Functionality
- Form Validation
- Responsive User Interface
- RESTful API Architecture
- MongoDB Database Integration
- Error Handling
- Protected Routes

 Technologies Used:

 Frontend
- HTML5
- CSS3
- JavaScript

 Backend

- Node.js
- Express.js

 Database

- MongoDB
- Mongoose

 Authentication

- JSON Web Token (JWT)
- bcrypt.js

 Additional Packages

- dotenv
- cors
- multer
- validator
- morgan
- nodemon

 Project Structure

Employee-Management-System/
│
├── client/
│   ├── html/
│   ├── css/
│   ├── js/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md

 Functional Modules

Authentication Module

- Admin Registration
- Admin Login
- JWT Token Generation
- Password Encryption
- Protected Routes

Employee Module
- Create Employee
- Read Employee
- Update Employee
- Delete Employee
- Search Employee

 Database Module

- MongoDB Connection
- Employee Collection
- User Collection

 REST API Endpoints

 Authentication

| Method | Endpoint | Description |
|----------|----------------|----------------|
| POST | /api/auth/register | Register Admin |
| POST | /api/auth/login | Login Admin |

 Employees

| Method | Endpoint | Description |
|----------|--------------------|----------------------|
| GET | /api/employees | Get All Employees |
| GET | /api/employees/:id | Get Employee |
| POST | /api/employees | Add Employee |
| PUT | /api/employees/:id | Update Employee |
| DELETE | /api/employees/:id | Delete Employee |


Installation

Clone Repository

```bash
git clone https://github.com/yourusername/Employee-Management-System.git
```
 Navigate to Project

```bash
cd Employee-Management-System/server
```
 Install Dependencies

```bash
npm install
```
 Create Environment File

Create a `.env` file.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TOKEN_EXPIRE=1d
```
 Start Server

```bash
npm run dev
```

or

```bash
npm start
```

---

Future Enhancements

- Employee Attendance Management
- Payroll System
- Leave Management
- Role-Based Access Control
- Email Notifications
- Dashboard Analytics
- Export Data to Excel/PDF
- Cloud Image Storage
- Docker Deployment

---
 Learning Outcomes

This project helped me understand:

- Backend Development with Node.js
- Express.js Framework
- MongoDB Database
- REST API Development
- JWT Authentication
- Password Encryption
- CRUD Operations
- MVC Architecture
- Git & GitHub Workflow
- Full Stack Web Development

---
Author

**THIYAGARAJAN S **

Bachelor of Engineering (Computer Science and Engineering)

GitHub Internship Project

---
 License

This project is developed for educational and internship purposes.
