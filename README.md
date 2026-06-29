TASK-02: 🏢 Employee Management System
Prodigy Infotech — Web Development Internship | Task 02

A full-stack web application that enables administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records, with proper authentication and data validation to protect sensitive information.

📋 Table of Contents
Overview
Features
Tech Stack
Project Structure
Getting Started
API Endpoints
Screenshots
Author

📌 Overview
This project was built as part of the Prodigy Infotech Web Development Internship Program (Task 02). The goal was to develop a secure Employee Management System where administrators can manage employee records through a clean and responsive web interface.

✨ Features

🔐 Authentication — Secure login system to protect access to employee data
➕ Create — Add new employee records with validation
📋 Read — View all employees in a structured, searchable table
✏️ Update — Edit existing employee information
🗑️ Delete — Remove employee records with confirmation prompt
✅ Validation — Input validation on both frontend and backend
📱 Responsive UI — Works across desktop and mobile devices

🛠️ Tech Stack
Frontend
HTML5, CSS3, JavaScript
(or React.js — update as applicable)

Backend
Node.js + Express.js

Database
MongoDB (Mongoose ODM)

Security
bcrypt — Password hashing
JSON Web Tokens (JWT) — Session authentication
express-validator — Input validation

📁 Project Structure

employee-management-system/
├── client/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server/
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── employees.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
├── .env.example
├── package.json
└── README.md


📸 Screenshots
![Dashboard](screenshots/dashboard.png)
![Add Employee](screenshots/add-employee.png)
![Employee List](screenshots/employee-list.png)


👨‍💻 Author
Raj
🎓 Intern at Prodigy Infotech
💼 Task 02 — Employee Management System
🔗 GitHub: @your-username



📄 License

This project was developed as part of an internship program for educational purposes.


