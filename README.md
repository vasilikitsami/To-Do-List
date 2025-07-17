# To-Do List Application

A full-stack To-Do app built with the MERN stack: **MongoDB**, **Express**, **React**, and **Node.js**.

This application allows users to create, edit, delete, search, filter and sort tasks, while also saving user preferences.

---

## Table of Contents

- 📌 [Project Overview]
- 🧩 [Project Architecture]
- 🛠️ [Installation & Setup]
- 🗄️ [Database Schema]
- 🌐 [API Endpoints]
- 💻 [Frontend Functionality]
  - ✅ [Add / Edit / Delete Todos]
  - 🔍 [Live Search & Filter]
  - 🔃 [Sorting]
  - 🧠 [User Preferences]



## 📌 Project Overview

This is a full-stack CRUD To-Do application where users can:
- Add new tasks
- Edit or delete existing tasks
- Mark tasks as complete or incomplete
- Search by task name
- Filter only incomplete tasks
- Sort by creation date or alphabetically
- Save sorting and search preferences in the database

The backend is built with **Node.js**, **Express**, and **MongoDB**, while the frontend is implemented using **React** (with Vite).

---

## 🧩 Project Architecture

To-Do-List/

├── backend/

│ ├── controllers/ # Request handling logic (CRUD, preferences)

│ ├── models/ # Mongoose schemas (Todo, Preferences, Results)

│ ├── routes/ # API endpoints, mapped to controller functions

│ ├── config/ # MongoDB connection

│ ├── seed.js # Preload sample data

│ └── server.js # App initialization and Express setup

├── frontend/

│ ├── components/ # All UI components (ToDo, Form, Filters, Edit, etc.)

│ ├── App.jsx # Main 

│ └── main.jsx # React entry point

├── .env # Environment config

├── package.json # Dependencies and scripts

└── README.md # Project documentation

## 🛠️ Installation & Setup

### 🔧 Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/todolist
PORT=4001
```

Start the backend:

```bash
npm run dev
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Database Schema

### ✅ `Todo` Model

```js
{
  task: String,
  completed: Boolean,
  isEditing: Boolean,
  createdAt: Date
}
```

### ⚙️ `Preferences` Model

```js
{
  sortMethod: String,
  searchTerm: String
}
```

### 📊 `Results` Model

```js
{
  sortMethod: String,
  searchTerm: String,
  results: [
    {
      task: String,
      completed: Boolean,
      createdAt: Date
    }
  ]
}
```

---

## 🌐 API Endpoints

| Method | Endpoint             | Description                            |
|--------|----------------------|----------------------------------------|
| GET    | `/api/todos`         | Get all todos                          |
| POST   | `/api/todos`         | Create a new todo                      |
| PUT    | `/api/todos/:id`     | Update a todo                          |
| DELETE | `/api/todos/:id`     | Delete a todo                          |
| GET    | `/api/preferences`   | Fetch saved sort/search preferences    |
| PUT    | `/api/preferences`   | Save updated preferences               |
| POST   | `/api/results`       | Save filtered results                  |
| GET    | `/api/users`         | Return sample users (testing)          |

---

## 💻 Frontend Functionality

### ✅ Add / Edit / Delete Todos

- Create a task using the form
- Inline edit existing todos
- Delete individual tasks
- Completion toggle applies strike-through

### 🔍 Live Search & Filter

- Search field updates the task list in real time
- A checkbox filters only incomplete tasks

### 🔃 Sorting

- Sort tasks by:
  - Alphabetically
  - By creation date
  - Default order

### 🧠 User Preferences

- When sort/search settings are changed, they are:
  - Saved in MongoDB
  - Re-applied on page reload


## 🧑‍💻 Author
Developed by Vasiliki Tsami as part of a full-stack internship exercise.






