import { useState, useEffect } from 'react'
import './App.css'

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState("")

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

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const res = await fetch(`${API}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task })
      });
      const newTodo = await res.json();
      setTodos(prev => [...prev, newTodo]);
      setTask("");
    } catch (err) {
      console.log("Add error:", err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API}/todos/${id}`, { method: "DELETE" });
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.log("Delete error:", err)
    }
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