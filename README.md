# DZPay - Employee Management API

A simple employee management API built with Bun, Express, and PostgreSQL.

## 🚀 Quick Start

### 1. Install dependencies
```bash
bun install
```

### 2. Setup environment
Create a `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/dzpay"
ACCESS_TOKEN_SECRET="your-secret-key"
```

### 3. Setup database
```bash
bunx prisma generate
bunx prisma migrate dev --name init
```

### 4. Run the app
```bash
bun run src/app.ts
```

Server runs on `http://localhost:3000`

## 📖 API Docs

Visit `http://localhost:3000/api-docs` for Swagger documentation.

## 🔗 Endpoints

- `POST /api/employees/register` - Register employee
- `POST /api/login` - Login
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## 🛠️ Tech Stack

- **Bun** - Runtime
- **Express** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication

Built with [Bun](https://bun.sh) 🚀