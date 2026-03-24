#  Client Dashboard Backend

A scalable backend system for managing projects and tasks with real-time updates, authentication, and role-based access control.

---

##  Features

*  **Authentication & Authorization**

  * JWT-based login system
  * Role-based access control (Admin/User)

*  **Project Management**

  * Create, update, delete projects
  * Assign users to projects

*  **Task Management**

  * CRUD operations for tasks
  * Task attributes: status, priority, due date, assigned user

*  **Real-Time Updates**

  * Integrated **Socket.io** for instant task updates
  * Emits `taskUpdated` events to all connected clients

*  **Database**

  * Powered by **Prisma ORM**
  * Structured schema with relations

---

##  Tech Stack

* **Backend:** Node.js, Express.js, TypeScript
* **Database:** PostgreSQL (via Prisma ORM)
* **Real-time:** Socket.io
* **Authentication:** JWT + Bcrypt
* **Validation:** Express Validator

---

##  Project Structure

```
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── config/        # Prisma & configs
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   ├── middleware/    # Auth & validation
│   ├── sockets.ts     # Socket.io setup
│   ├── app.js         # Express app
│   └── server.js      # Server entry point
│
├── .env
├── package.json
```

---

##  Setup Instructions

### 1️ Clone the repository

```
git clone <your-repo-link>
cd backend
```

### 2️ Install dependencies

```
npm install
```

### 3️ Setup environment variables

Create `.env` file:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4️ Run Prisma migrations

```
npx prisma migrate dev
npx prisma generate
```

---

### 5️ Start the server

```
npm run dev
```

---

## 🔌 Real-Time (Socket.io)

* Server initializes Socket.io
* On task update:

```
io.emit("taskUpdated", updatedTask);
```

* Clients receive updates instantly without refresh

---

##  API Endpoints (Sample)

###  Auth

* `POST /api/auth/login`

###  Projects

* `POST /api/projects`
* `GET /api/projects`

###  Tasks

* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`

---

##  Key Design Decisions

* Modular folder structure for scalability
* Prisma ORM for type-safe database access
* Socket.io for efficient real-time communication
* Separation of concerns (routes, controllers, services)

---

##  Future Improvements

* Add WebSocket rooms for project-specific updates
* Implement refresh tokens
* Add rate limiting & security enhancements
* Dockerize the application

---

## 
