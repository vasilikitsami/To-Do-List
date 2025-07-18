import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToDoWrapper } from "./components/ToDoWrapper";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDoWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
