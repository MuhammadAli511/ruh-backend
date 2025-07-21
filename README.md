# Ruh Backend - Wellness Clinic Management System

A Node.js backend API for managing wellness clinic clients and appointments.

## 🚀 Hosted URL
**Production:** https://ruh-backend-production.up.railway.app

## 📋 Table of Contents
- [Stack Used](#stack-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)

## 🛠 Stack Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Database Client:** @supabase/supabase-js
- **Environment Management:** dotenv

## 📁 Project Structure

The project follows a layered architecture pattern:

```
ruh-backend/
├── config/
│   └── database.js              # Database configuration (Supabase)
├── controllers/
│   ├── adminController.js       # Admin authentication controllers
│   ├── appointmentController.js # Appointment CRUD controllers  
│   └── clientController.js      # Client management controllers
├── middlewares/
│   └── authMiddleware.js        # JWT authentication middleware
├── models/
│   ├── Admin.js                 # Admin model class
│   ├── Appointment.js           # Appointment model class
│   └── Client.js                # Client model class
├── repositories/
│   ├── adminRepository.js       # Admin database operations
│   ├── appointmentRepository.js # Appointment database operations
│   └── clientRepository.js      # Client database operations
├── routes/
│   ├── adminRoutes.js           # Admin authentication routes
│   ├── appointmentRoutes.js     # Appointment CRUD routes
│   ├── clientRoutes.js          # Client management routes
│   └── index.js                 # Main router configuration
├── services/
│   ├── adminService.js          # Admin business logic
│   ├── appointmentService.js    # Appointment business logic
│   └── clientService.js         # Client business logic
├── sql/
│   ├── create-admins-table.sql      # Admin table creation script
│   ├── create-appointments-table.sql # Appointments table creation script
│   └── create-clients-table.sql     # Clients table creation script
├── index.js                     # Application entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

### Architecture Flow
```
Routes → Controllers → Services → Repositories → Models
```

- **Routes:** Define API endpoints and apply middleware
- **Controllers:** Handle HTTP requests/responses and error handling
- **Services:** Contain business logic and validation
- **Repositories:** Handle database operations
- **Models:** Define data structures and utility methods

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm
- Supabase account and project

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ruh-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
PORT=8000
SUPABASE_URL=your_supabase_project_url
SUPABASE_API_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
```

### 4. Database Setup
Run the SQL scripts in your Supabase SQL editor in this order:

1. `sql/create-admins-table.sql`
2. `sql/create-clients-table.sql`
3. `sql/create-appointments-table.sql`

### 5. Run the Application

#### Development
```bash
npm run dev
```

#### Production
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 8000).

## 📡 API Endpoints

### Base URL
- **Local:** `http://localhost:8000/api`
- **Production:** `https://ruh-backend-production.up.railway.app/api`

### Authentication Endpoints

#### Admin Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /api/admin/refresh-token
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

### Client Endpoints (Require Admin Authentication)

#### Get All Clients
```http
GET /api/clients
Authorization: Bearer your_access_token
```

#### Get Client by ID
```http
GET /api/clients/:id
Authorization: Bearer your_access_token
```

### Appointment Endpoints (Require Admin Authentication)

#### Get All Appointments
```http
GET /api/appointments
Authorization: Bearer your_access_token
```

#### Get Appointment by ID
```http
GET /api/appointments/:id
Authorization: Bearer your_access_token
```

#### Create New Appointment
```http
POST /api/appointments
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "client_id": "uuid-of-client",
  "time": "2024-12-25T10:00:00Z"
}
```

#### Update Appointment
```http
PUT /api/appointments/:id
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "client_id": "uuid-of-client",
  "time": "2024-12-25T11:00:00Z"
}
```

#### Cancel Appointment
```http
DELETE /api/appointments/:id
Authorization: Bearer your_access_token
```

#### Get Appointments by Client ID
```http
GET /api/appointments/client/:clientId
Authorization: Bearer your_access_token
```

### Health Check
```http
GET /api/health
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_API_KEY` | Your Supabase anon/public key | Yes |
| `JWT_SECRET` | Secret key for JWT token signing | Yes |

## 🗄 Database Schema

### Admin Table
```sql
- id (UUID, Primary Key)
- first_name (VARCHAR)
- last_name (VARCHAR) 
- email (VARCHAR, Unique)
- password_hash (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Clients Table
```sql
- id (UUID, Primary Key)
- name (VARCHAR)
- email (VARCHAR, Unique)
- phone (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Appointments Table
```sql
- id (UUID, Primary Key)
- client_id (UUID, Foreign Key → clients.id)
- time (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 📝 Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication:
1. Login with admin credentials to receive access and refresh tokens
2. Include the access token in the Authorization header as `Bearer <token>`
3. Access tokens expire in 24 hours
4. Use refresh tokens to get new access tokens (refresh tokens expire in 30 days)