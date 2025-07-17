import React, { useEffect, useState } from "react";
import { ToDoForm } from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./ToDo";
import { EditToDoForm } from "./EditTodoForm";
import { SortOptions } from "./SortOptions";
import { SearchBar } from "./SearchBar";
import { CheckBox } from "./CheckBox";
import { sortTodosByMethod } from "../utils";

export const ToDoWrapper = () => {
  //Fetch todo list from backend and store it in state
  useEffect(() => {
    fetch("http://localhost:4001/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Failed to fetch todos:", error));
  }, []);

  const [todos, setTodos] = useState([]);

  const [sortMethod, setSortMethod] = useState("");

  const [searchTerm, setSearchTerm] = useState(""); //save what is written in search bar

  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false); //if true -> only incompleted tasks

  useEffect(() => {
    // Fetch existing preferences from sortMethod and searchTerm
    fetch("http://localhost:4001/api/preferences")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSortMethod(data.sortMethod || "default");
          setSearchTerm(data.searchTerm || "");
        }
      })
      .catch((err) => {
        console.error("Error fetching preferences:", err);
      });
  }, []);

  useEffect(() => {
    if (!sortMethod && !searchTerm) return;

    // Save preferences to the backend whenever sortMethod or searchTerm changes
    fetch("http://localhost:4001/api/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sortMethod, searchTerm }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Preferences saved:", data))
      .catch((err) => {
        console.error("Error updating preferences:", err);
      });
  }, [sortMethod, searchTerm]);

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (res.ok) {
      const saved = await res.json();
      setTodos([...todos, saved]);
    }
    setTodos([...todos, newTodo]);
  };

  //Update completion of task
  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((t) => t._id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    //use fetch to update the task in the backend
    await fetch(`http://localhost:4001/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:4001/api/todos/${id}`, {
      method: "DELETE",
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
      headers: { "Content-Type": "application/json" },
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

  const saveFilteredResults = async () => {
    const resultsToSave = {
      sortMethod,
      searchTerm,
      results: filteredTodos.map(({ task, completed, createdAt }) => ({
        task,
        completed,
        createdAt,
      })),
    };
    await fetch("http://localhost:4001/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultsToSave),
    });

    try {
      const response = await fetch("http://localhost:4001/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultsToSave),
      });

      if (!response.ok) {
        throw new Error("Failed to save results");
      }

      const savedResults = await response.json();
      console.log("Results saved:", savedResults);
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  console.log("Rendering todos:", filteredTodos);

  return (
    <div className="ToDoWrapper">
      <h1>Get Things Done!</h1>
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
    </div>
  );
};
