import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const ToDoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    //prevent default action
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a task.");
      return;
    }
    const newTodo = {
      task: value,
      completed: false,
      isEditing: false,
      createdAt: new Date().toISOString(), //save date of addition
    };

    const response = await fetch("http://localhost:4001/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, //send token to backend
      },
      body: JSON.stringify(newTodo),
    });

    if (value.trim()) {
      addTodo(value);
      setValue("");
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What is the task today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
