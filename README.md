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

### 1. Clone the repository

```bash
git clone https://github.com/vasilikitsami/To-Do-List.git
cd To-Do-List

### 2. Setup Backend

cd backend
npm install

##Add an .env file:

MONGO_URI=mongodb://127.0.0.1:27017/todolist
PORT=4001

##Start the server:

npm run dev

### 3. Setup Frontend

cd frontend
npm install
npm run dev


🗄️ Database Schema

✅ Todo Model

{
  task: String,
  completed: Boolean,
  isEditing: Boolean,
  createdAt: Date
}


⚙️ Preferences Model

{
  sortMethod: String,
  searchTerm: String
}


📊 Results Model

{
  sortMethod: String,
  searchTerm: String,
  results: [{ task, completed, createdAt }]
}

🌐 API Endpoints

Method	   Endpoint	           Description
GET	       /api/todos	       Get all todos
POST	   /api/todos	       Create a new todo
PUT	       /api/todos/:id	   Update a todo
DELETE	   /api/todos/:id	   Delete a todo
GET	       /api/preferences	   Fetch user preferences
PUT	       /api/preferences	   Update user preferences
POST	   /api/results    	   Save filtered results
GET	       /api/users	       Return dummy users (testing endpoint)


💻 Frontend Functionality


✅ Add / Edit / Delete Todos

- Users can add a task using the input form.

- Tasks can be edited or deleted with a single click.

- Completed tasks are shown with a strikethrough style.


🔍 Live Search & Filter

- Users can filter tasks by name using the search bar.

- Toggle to display only incomplete tasks with a checkbox.


🔃 Sorting

- Users can sort tasks by:

    - Default (as added)

    - Alphabetical order

    - Creation Date


🧠 User Preferences

- The selected sort option and search term are automatically saved to the backend.

- When refreshing the page, preferences are reloaded and applied to maintain continuity.


🙋‍♀️ Author
Developed by Vasiliki Tsami as part of a full-stack internship exercise.






