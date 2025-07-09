import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToDoWrapper } from './components/ToDoWrapper';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ToDoWrapper />
    </div>
  );
  
}

export default App
