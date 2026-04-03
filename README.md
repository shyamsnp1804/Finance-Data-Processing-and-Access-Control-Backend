# 💰 Finance Dashboard Backend API

## 📌 Overview

This project is a backend system for a finance dashboard application. It provides secure authentication, role-based access control, financial record management, and analytics APIs for dashboard insights.

---

## 🚀 Features

### 🔐 Authentication

- JWT-based authentication (Access + Refresh Tokens)
- Secure HTTP-only cookies
- Token blacklisting using Redis

### 👤 User & Role Management

- Roles: Viewer, Analyst, Admin
- Role-based access control (RBAC)
- User status (active/inactive)

### 💰 Financial Records

- Create, Read, Update, Delete (CRUD)
- Filter by type, category, and date
- Pagination support

### 📊 Dashboard Analytics

- Total Income
- Total Expense
- Net Balance
- Category-wise breakdown
- Monthly trends using MongoDB aggregation

## 📌 Assumptions

- Each record belongs to a single user
- Admin has full access
- Viewer and Analyst have read-only access

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- JWT Authentication
- Swagger (API Documentation)

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

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### 💰 Records

- POST /api/records (Admin only)
- GET /api/records (All roles)
- PUT /api/records/:id (Admin only)
- DELETE /api/records/:id (Admin only)

### 📊 Dashboard

- GET /api/dashboard/summary

---

## 📦 Sample API Responses

### 🔐 Login Response

```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "661234abcd1234",
    "fullname": "Shyam",
    "username": "shyam123",
    "email": "shyam@gmail.com",
    "role": "admin"
  }
}
```

---

### 💰 Create Record Response

```json
{
  "success": true,
  "record": {
    "_id": "662345abcd5678",
    "user": "661234abcd1234",
    "amount": 5000,
    "type": "income",
    "category": "salary",
    "notes": "April salary",
    "createdAt": "2026-04-03T10:00:00.000Z"
  }
}
```

---

### 📊 Dashboard Summary Response

```json
{
  "success": true,
  "summary": {
    "totalIncome": 8000,
    "totalExpense": 2000,
    "netBalance": 6000,
    "categoryBreakdown": [
      {
        "_id": "salary",
        "total": 5000
      },
      {
        "_id": "food",
        "total": 500
      }
    ],
    "monthlyTrends": [
      {
        "_id": 4,
        "total": 8500
      }
    ]
  }
}
```

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
git clone https://github.com/shyamsnp1804/Finance-Data-Processing-and-Access-Control-Backend
cd auth-backend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development

REDIS_URL=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password_if_any
```

4. Run the server

```bash
npm run dev
```

---

## 📄 API Documentation

Swagger UI available at:
http://localhost:3000/api-docs

## 🔗 Demo

Run locally and access:
http://localhost:3000/api-docs

---

## 📌 Key Highlights

- Role-based access control using middleware
- Secure authentication with token rotation
- Redis-based token revocation (blacklisting)
- MongoDB aggregation pipelines for analytics
- Clean and scalable folder structure

---

## 👨‍💻 Author

Shyam Narayan Pandey
