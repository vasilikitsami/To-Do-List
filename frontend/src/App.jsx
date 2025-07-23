import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { ToDoWrapper } from "./components/ToDoWrapper";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ToDoWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
