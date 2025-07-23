import React, { useEffect, useState } from "react";
import { ToDoForm } from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./ToDo";
import { EditToDoForm } from "./EditTodoForm";
import { SortOptions } from "./SortOptions";
import { SearchBar } from "./SearchBar";
import { CheckBox } from "./CheckBox";
import { sortTodosByMethod } from "../utils";
import { useAuthContext } from "../hooks/useAuthContext";

export const ToDoWrapper = () => {
  //Fetch todo list from backend and store it in state only if user is logged in
  const { user } = useAuthContext();

  const [todos, setTodos] = useState([]);

  const [sortMethod, setSortMethod] = useState("");

  const [searchTerm, setSearchTerm] = useState(""); //save what is written in search bar

  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false); //if true -> only incompleted tasks

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:4001/api/todos", {
          headers: {
            Authorization: `Bearer ${user.token}`, //send token to backend
          },
        });

        const data = await response.json();

        if (response.ok) {
          setTodos(data);
        } else {
          console.error("Failed to fetch todos:", data.error);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    if (user) {
      fetchTodos();
    }
  }, [user]);

  //Create new task and add in todos array
  const addTodo = async (todo) => {
    const newTodo = {
      task: todo,
      completed: false,
      isEditing: false,
      createdAt: new Date().toISOString(), //save date of addition
    };

    //load exsisting todos from the backend
    const res = await fetch("http://localhost:4001/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, //send token to backend
      },
      body: JSON.stringify(newTodo),
    });

    if (res.ok) {
      const saved = await res.json();
      setTodos([...todos, saved]);
    }
  };

  //Update completion of task
  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((t) => t._id === id);
    const updatedTodo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    };

    //use fetch to update the task in the backend
    await fetch(`http://localhost:4001/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, //send token to backend
      },
      body: JSON.stringify(updatedTodo),
    });

    setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:4001/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`, //send token to backend
      },
    });

    setTodos(todos.filter((t) => t._id !== id));
  };

  //Change isEditing to true: edit form appears
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  //Update task with edited text
  const editTask = async (newTask, id) => {
    if (!id) return;

    const updatedTodo = todos.find((t) => t._id === id);

    if (!updatedTodo) return;
    const todoToSend = { ...updatedTodo, task: newTask, isEditing: false };

    await fetch(`http://localhost:4001/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, //send token to backend
      },
      body: JSON.stringify(todoToSend),
    });

    setTodos(todos.map((t) => (t._id === id ? todoToSend : t)));
  };

  //Sorting Options
  const sortedTodos = sortTodosByMethod(todos, sortMethod);

  //Search Tasks
  const filteredTodos = sortedTodos.filter((todo) => {
    //checks if searchTerm is included in task
    const matchesSearch =
      searchTerm.trim() === "" ||
      todo.task.toLowerCase().includes(searchTerm.toLowerCase());
    //checks if only incompleted tasks are filtered
    const matchesCompletion =
      !showOnlyIncomplete || (!todo.completed && !todo.checked);
    return matchesSearch && matchesCompletion; //only tasks that meet both criteria are returned
  });

  console.log("todos:", todos);

  return (
    <div className="ToDoWrapper">
      {!user ? (
        <p style={{ color: "#fff" }}>Please log in to view your tasks.</p>
      ) : (
        <>
          <SearchBar setSearchTerm={setSearchTerm} />
          <CheckBox
            showOnlyIncomplete={showOnlyIncomplete}
            setShowOnlyIncomplete={setShowOnlyIncomplete}
          />
          <SortOptions sortMethod={sortMethod} setSortMethod={setSortMethod} />
          <ToDoForm addTodo={addTodo} />
          {searchTerm.trim() !== "" && filteredTodos.length === 0 ? (
            <p style={{ color: "#fff", marginTop: "1rem" }}>
              No matching tasks found.
            </p>
          ) : (
            filteredTodos.map((todo) =>
              todo.isEditing ? (
                <EditToDoForm editTodo={editTask} task={todo} key={todo._id} />
              ) : (
                <Todo
                  task={todo}
                  key={todo._id}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              )
            )
          )}
        </>
      )}
    </div>
  );
};
