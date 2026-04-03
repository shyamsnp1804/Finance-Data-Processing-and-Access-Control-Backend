# 💰 Finance Dashboard Backend API

## 📌 Overview

This project is a backend system for a finance dashboard application. It provides secure authentication, role-based access control, financial record management, and analytics APIs for dashboard insights.

---

## 🚀 Features

### 🔐 Authentication

* JWT-based authentication (Access + Refresh Tokens)
* Secure HTTP-only cookies
* Token blacklisting using Redis

### 👤 User & Role Management

* Roles: Viewer, Analyst, Admin
* Role-based access control (RBAC)
* User status (active/inactive)

### 💰 Financial Records

* Create, Read, Update, Delete (CRUD)
* Filter by type, category, and date
* Pagination support

### 📊 Dashboard Analytics

* Total Income
* Total Expense
* Net Balance
* Category-wise breakdown
* Monthly trends using MongoDB aggregation

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Redis
* JWT Authentication
* Swagger (API Documentation)

---

## 📂 Folder Structure

```
auth-backend/
├── src/
│   ├── config/         # DB, Redis, Swagger config
│   ├── controllers/    # Business logic
│   ├── middlewares/    # Auth & role middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── utils/          # Helper functions (tokens etc.)
├── server.js           # Entry point
├── package.json
├── .env                # Environment variables (not committed)
├── .gitignore
└── README.md
```

---

## 📂 API Endpoints

### 🔐 Auth

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/logout
* GET /api/auth/me

### 💰 Records

* POST /api/records (Admin only)
* GET /api/records (All roles)
* PUT /api/records/:id (Admin only)
* DELETE /api/records/:id (Admin only)

### 📊 Dashboard

* GET /api/dashboard/summary

---

## 🔐 Access Control

| Role    | Permissions                |
| ------- | -------------------------- |
| Viewer  | Read-only access           |
| Analyst | Read + analytics           |
| Admin   | Full access (CRUD + users) |

---

## ⚙️ Setup Instructions

1. Clone the repository

```bash
git clone <your-repo-url>
cd auth-backend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```env
MONGO_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
REDIS_URL=127.0.0.1
REDIS_PORT=6379
```

4. Run the server

```bash
npm run dev
```

---

## 📄 API Documentation

Swagger UI available at:
http://localhost:3000/api-docs

---

## 📌 Key Highlights

* Role-based access control using middleware
* Secure authentication with token rotation
* Redis-based token revocation (blacklisting)
* MongoDB aggregation pipelines for analytics
* Clean and scalable folder structure

---

## 👨‍💻 Author

Shyam Narayan Pandey