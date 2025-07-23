# MERN Crash Course ToDo List

This project is a full-stack To-Do List application built with the MERN stack: **MongoDB**, **Express.js**, **React**, and **Node.js**. It allows users to register, log in, and securely manage their personal tasks. Each user can create, view, update, and delete their own to-do items, with all data securely stored in a MongoDB database.

---

## Table of Contents

- [MERN Crash Course ToDo List](#mern-crash-course-todo-list)

  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Project Structure](#project-structure)
  - [Backend Structure](#backend-structure)

    - [How the components connect with each other](#how-the-components-connect-with-each-other)
    - [Backend Setup](#backend-setup)
    - [Database Structure](#database-structure)
    - [API Endpoints](#api-endpoints)
    - [Controllers](#controllers)
    - [Middleware](#middleware)

  - [Frontend](#frontend)

    - [Features](#features)
    - [Frontend Installation & Setup](#frontend-installation--setup)
    - [Frontend Structure](#frontend-structure)

      - [Entry Points](#entry-points)
      - [Components](#components)
      - [Pages](#pages)
      - [Hooks & Context](#hooks--context)

    - [Core Functionality](#core-functionality)

      - [Task Creation](#task-creation)
      - [Completion Toggle](#completion-toggle)
      - [Deletion](#deletion)
      - [Live Search](#live-search)
      - [Filter by Incomplete](#filter-by-incomplete)
      - [Sorting](#sorting)

---

## Project Description

This project demonstrates a basic To-Do app where users can create, read, update, and delete tasks. The backend is powered by Node.js and Express, with data stored in MongoDB using Mongoose ODM. The frontend is built with React and styled with Tailwind CSS. It features live filtering, sorting, and JWT-based authentication.

---

## Project Structure

```
full-stack-todo/
├── backend/          # Backend (Node.js/Express)
├── frontend/         # Frontend (React)
├── .env              # Environment variables
├── package.json      # Root metadata (backend)
└── README.md         # This file
```

---

## Backend Structure

```
backend/
├── config/
│   └── mongo-db.js            # MongoDB connection logic
├── controllers/
│   ├── toDoController.js      # Task CRUD logic
│   └── userController.js      # Signup/Login logic
├── middleware/
│   └── requireAuth.js         # JWT validation middleware
├── models/
│   ├── Todo.js                # To-do item schema
│   └── User.js                # User schema
├── routes/
│   ├── toDoRoutes.js          # /api/todos endpoint
│   └── userRoutes.js          # /api/users endpoint
├── server.js                  # App entry point
└── .env                       # Environment variables (MONGO_URI, SECRET)
```

### How the components connect with each other

- `server.js` initializes the Express server, connects to MongoDB, and registers routes.
- `routes` define endpoints and use `requireAuth` middleware.
- `controllers` contain business logic for handling HTTP requests.
- `models` define MongoDB schemas.
- `requireAuth.js` protects the todo routes with JWT validation.

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
MONGO_URI=your_mongo_connection_string
SECRET=your_jwt_secret
```

---

### Database Structure

#### Todo Schema

```js
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: String, required: true },
});
```

#### User Schema

```js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
```

---

### API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/todos        | Get user's todos  |
| POST   | /api/todos        | Create a todo     |
| PUT    | /api/todos/\:id   | Update a todo     |
| DELETE | /api/todos/\:id   | Delete a todo     |
| POST   | /api/users/login  | Login a user      |
| POST   | /api/users/signup | Signup a new user |

> Note: All `/api/todos/*` routes require Authorization header: `Bearer <token>`

---

### Controllers

- `toDoController.js`: Logic for CRUD operations
- `userController.js`: Logic for user registration/login & JWT issuing

---

### Middleware

- `requireAuth.js`: Validates JWT token and appends `req.user` before accessing protected routes

---

## Frontend

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CheckBox.jsx
│   │   ├── EditTodoForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortOptions.jsx
│   │   ├── ToDo.jsx
│   │   ├── ToDoForm.jsx
│   │   └── ToDoWrapper.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useAuthContext.jsx
│   │   ├── useLogin.jsx
│   │   ├── useLogout.jsx
│   │   └── useSignup.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

---

### Features

- ✅ Create, edit, and delete todos
- 🔒 JWT Authentication
- 🔁 Live state updates (no refresh)
- 🔍 Search bar filtering
- ✅ Show only incomplete checkbox
- ↕️ Sort by creation or alphabetically

---

### Frontend Installation & Setup

```bash
cd frontend
npm install
npm run dev
```

---

### Entry Points

- `main.jsx`: Mounts React app to root
- `App.jsx`: Handles routes and layout

---

### Components

- `ToDoWrapper.jsx`: Central todo logic, handles API and filtering
- `ToDoForm.jsx`, `EditTodoForm.jsx`: Add/edit task forms
- `Todo.jsx`: Single todo display with edit/delete buttons
- `SortOptions.jsx`, `SearchBar.jsx`, `CheckBox.jsx`: UI filters
- `Navbar.jsx`: Navigation bar

---

### Pages

- `Login.jsx`: Login form
- `Signup.jsx`: Signup form

---

### Hooks & Context

- `AuthContext.jsx`: Provides `user` object to all components
- `useLogin`, `useSignup`, `useLogout`: Hook logic for auth

---

## Core Functionality

### Task Creation

- User submits form → API POST `/api/todos`
- UI updates instantly using `setTodos([savedTodo, ...prev])`

### Completion Toggle

- Checkbox sends PUT request → backend updates task

### Deletion

- Button triggers DELETE request
- UI filters out deleted task

### Live Search

```js
todos.filter((todo) =>
  todo.task.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Filter by Incomplete

```js
todos.filter((todo) => !todo.completed);
```

### Sorting

```js
todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
todos.sort((a, b) => a.task.localeCompare(b.task));
```

---

**Author:** Vasiliki Tsami
