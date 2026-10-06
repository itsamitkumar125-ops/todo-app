import { useState, useEffect } from 'react'
import './App.css'

// Ye line sabse important hai - Render ka URL yaha se aayega
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState("")

  // Backend se todos lana
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.log("Fetch error:", err)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Add karna
  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const res = await fetch(`${API}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task, title: task })
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setTask("");
    } catch (err) {
      console.log(err)
    }
  }

  // Delete karna
  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter(t => t._id !== id));
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="input-box">
        <input 
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task likho..."
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text || todo.title}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App